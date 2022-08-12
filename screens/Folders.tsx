import React, {useEffect, useState} from 'react';
import FolderItem from "../components/FolderItem";
import {FlatList, RefreshControl, StyleSheet, View} from "react-native";
import {useSelector} from "react-redux";
import {fetchFolders} from "../util/http";
import {setFolderAction} from "../store/foldersReducer";
import LoadingIndicator from "../components/LoadingIndicator";
import {Colors} from "../assets/colors/Colors";
import {getFolders, getUserId} from "../store/selectors";



const Folders = ({navigation}) => {

    const foldersState = useSelector(getFolders)
    const [refresh, setRefresh] = useState(false)
    const [isFetching, setIsFetching] = useState(false)
    const [fetchedFolders, setFetchedFolders] = useState([])
    const {userId} = useSelector(getUserId)
    const filteredFolders = fetchedFolders.filter(folder => folder.idFromUser === userId)


    const handleRefresh = () => {
        fetchFolders().catch(e => e.message())
        setRefresh(false)
    }

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



    const renderItem = (itemData) => {
        return <FolderItem
            id={itemData.item.id}
            title={itemData.item.title}
            image={itemData.item.image}
            onSelect={() => {
                navigation.navigate('ContactsList', {
                        contactId: itemData.item.id,
                        contactTitle: itemData.item.title,
                        contactPic: itemData.item.photo
                })
            }}
        />
    }


    return (
                <FlatList
                    refreshControl={
                        <RefreshControl
                            refreshing={refresh}
                            onRefresh={() => handleRefresh}
                            tintColor={Colors.accent}
                        />
                    }
                    data={filteredFolders}
                    renderItem={renderItem}
                    numColumns={2}
                    style={styles.container}
                />

    );
};


export default Folders;

const styles = StyleSheet.create({
    container: {
        marginTop: 90,
        backgroundColor: 'black',
    }
})



