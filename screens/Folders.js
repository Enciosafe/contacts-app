import React, {useEffect, useState} from 'react';
import FolderItem from "../components/FolderItem";
import {FlatList, StyleSheet} from "react-native";
import {useSelector} from "react-redux";
import {fetchFolders} from "../util/http";
import {setFolderAction} from "../store/foldersReducer";


const Folders = ({navigation}) => {
    const folders = useSelector(state => state.folders.folders)
    const [fetchedFolders, setFetchedFolders] = useState([])


    useEffect(() => {
        let isMounted = true;
        const getFolders = async () => {
           const folders =  await fetchFolders()
            if(isMounted) {
                setFetchedFolders(folders)
            }
        }
        getFolders()
        setFolderAction(folders)
        return () => {
            isMounted = false
        }
    }, [fetchedFolders])




    const renderItem = (itemData) => {
        return <FolderItem
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
            data={fetchedFolders}
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



