import React, {useEffect, useState, useCallback} from 'react';
import FolderItem from "../components/FolderItem";
import {
    FlatList,
    RefreshControl,
    StyleSheet,
    View,
    Text,
    TextInput,
    Platform,
    TouchableWithoutFeedback, KeyboardAvoidingView, Keyboard
} from "react-native";
import {useSelector} from "react-redux";
import {fetchFolders} from "../util/http";
import {setFolderAction} from "../store/foldersReducer";
import LoadingIndicator from "../components/LoadingIndicator";
import {Colors} from "../assets/colors/Colors";
import {getFolders, getUserId} from "../store/selectors";
import * as Haptics from 'expo-haptics';



const Folders = ({navigation}) => {

    const foldersState = useSelector(getFolders)
    const [refresh, setRefresh] = useState(false)
    const [isFetching, setIsFetching] = useState(false)
    const [fetchedFolders, setFetchedFolders] = useState([])
    const [filterFolders, setFilterFolders] = useState('');
    const {userId} = useSelector(getUserId)
    const filteredFolders = fetchedFolders.filter(folder => folder.idFromUser === userId)


    const handleRefresh = useCallback(
        () => {
            let isMounted = true;
            const getFolders = async () => {
                setIsFetching(true)
                const folders =  await fetchFolders()

                if(isMounted) {
                    setFetchedFolders(folders)
                }
                setFolderAction(folders)
            }
            getFolders().catch(e => console.log(e.message))
            setIsFetching(false)
            setRefresh(false)
            return () => {
                isMounted = false
            }
        },
        [foldersState],
    );

    useEffect(() => {
        let isMounted = true;
        const getFolders = async () => {
            setIsFetching(true)
           const folders =  await fetchFolders()

            if(isMounted) {
                setFetchedFolders(folders)
            }
            setFolderAction(folders)
        }
        getFolders().catch(e => console.log(e.message))
        setIsFetching(false)
        return () => {
            isMounted = false
        }
    }, [foldersState])

    if(isFetching) {
        return (
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: Colors.fill}}>
                <LoadingIndicator size={100}/>
            </View>
        )

    }

    const keyboardDismissHandler = () => {
        Keyboard.dismiss
        setFilterFolders('')
    }

    const upperFilterFolders = filterFolders.toUpperCase()
    const foundFolders = filteredFolders.filter(folder =>
        folder.title.includes(upperFilterFolders))



    const renderItem = (itemData) => {
        return <FolderItem
            id={itemData.item.id}
            title={itemData.item.title}
            image={itemData.item.image}
            onSelect={() => {
                Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success)
                navigation.navigate('ContactsList', {
                        contactId: itemData.item.id,
                        contactTitle: itemData.item.title,
                        contactPic: itemData.item.photo
                })
            }}
        />
    }


    return (
                <>
                    <FlatList
                        refreshControl={
                            <RefreshControl
                                refreshing={refresh}
                                onRefresh={handleRefresh}
                                tintColor={Colors.accent}
                            />
                        }
                        data={filterFolders === '' ? filteredFolders : foundFolders}
                        renderItem={renderItem}
                        numColumns={3}
                        style={styles.container}
                    />
                    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
                        <TouchableWithoutFeedback onPress={keyboardDismissHandler}>
                            <View style={styles.searchContainer}>
                                <TextInput
                                    placeholder='SEARCH'
                                    placeholderTextColor='gray'
                                    maxLength={25}
                                    value={filterFolders}
                                    onChangeText={value => setFilterFolders(value)}
                                    style={[styles.input, styles.text]}
                                />
                            </View>
                        </TouchableWithoutFeedback>
                        <View>
                            {filterFolders !== '' && foundFolders.map(item =>
                                <Text key={item.title}>{item.title}</Text>
                            )}
                        </View>
                    </KeyboardAvoidingView>
                </>


    );
};


export default Folders;

const styles = StyleSheet.create({
    container: {
        marginTop: 90,
        backgroundColor: 'black',
    },
    searchContainer: {
        padding: 30,
        backgroundColor: 'black',
        borderWidth: 1,
        borderTopColor: Colors.accent,
    },
    input: {
        marginVertical: 8,
        paddingHorizontal: 8,
        paddingVertical: 8,
        fontSize: 16,
        backgroundColor: Colors.input,
        borderRadius: 5,
    },
    text: {
        fontFamily: 'Qanelas-Regular',
        color: 'black'
    },
})



