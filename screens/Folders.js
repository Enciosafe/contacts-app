import React from 'react';
import {folders} from '../data/dummy'

import FolderItem from "../components/FolderItem";
import {FlatList, ScrollView, StyleSheet} from "react-native";


const Folders = () => {

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

