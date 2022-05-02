import React, {useEffect, useState} from 'react';
import FolderItem from "../components/FolderItem";
import {FlatList, StyleSheet} from "react-native";
import {useSelector} from "react-redux";
import {fetchFolders} from "../util/http";
import {setFolderAction} from "../store/foldersReducer";
import LoadingOverlay from "../Ui/LoadingOverlay";


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
            setIsFetching(false)
            if(isMounted) {
                setFetchedFolders(folders)
            }
            setFolderAction(foldersState)
        }
        getFolders()
        return () => {
            isMounted = false
        }
    }, [foldersState])

    if(isFetching) {
        return <LoadingOverlay/>
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
                        contactTitle: itemData.item.title
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
        marginTop: 100,
    }
})



