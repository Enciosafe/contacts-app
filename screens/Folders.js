import React, {useEffect} from 'react';
import FolderItem from "../components/FolderItem";
import {FlatList, StyleSheet} from "react-native";
import {useSelector} from "react-redux";



const Folders = () => {
    const folders = useSelector(state => state.folders.folders)

    useEffect(() => {
        console.log(folders)
    }, [folders]);


    const renderItem = ({item}) => (
        <FolderItem
            id={item.id}
            title={item.title}
            description={item.description}
        />
    )

    return (
        <FlatList
            data={folders}
            renderItem={renderItem}
            numColumns={3}
        />

    );
};

export default Folders;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row'
    }
})

