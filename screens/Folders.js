import React, {useEffect} from 'react';
import FolderItem from "../components/FolderItem";
import {FlatList, StyleSheet} from "react-native";
import {useSelector} from "react-redux";



const Folders = ({route, navigation}) => {
    const folders = useSelector(state => state.folders.folders)

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
            data={folders}
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



