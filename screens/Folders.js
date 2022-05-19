import React, {useEffect, useState} from 'react';
import FolderItem from "../components/FolderItem";
import {FlatList, StyleSheet, View} from "react-native";
import {useSelector} from "react-redux";
import {fetchFolders} from "../util/http";
import {setFolderAction} from "../store/foldersReducer";
import LoadingIndicator from "../components/LoadingIndicator";
import {Colors} from "../assets/colors/Colors";



const Folders = ({navigation}) => {
    const foldersState = useSelector(state => state.folders.folders)
    const [isFetching, setIsFetching] = useState(false)
    const [fetchedFolders, setFetchedFolders] = useState([])
    const {userId} = useSelector(state => state.auth)
    const filteredFolders = fetchedFolders.filter(folder => folder.idFromUser === userId)



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
        getFolders()
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
            idFromUser={itemData.item.idFromUser}
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



