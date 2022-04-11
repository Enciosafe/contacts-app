import React, {useEffect} from 'react';
import FolderItem from "../components/FolderItem";
import {FlatList, StyleSheet} from "react-native";
import {useSelector} from "react-redux";



const Folders = ({navigation}) => {
    const folders = useSelector(state => state.folders.folders)

    const renderItem = ({item}) => (
        <FolderItem
            id={item.id}
            title={item.title}
            description={item.description}
            onSelect={() => {
                navigation.navigate({
                    routeName:'Contacts',
                    params: {
                        contactId: item.id
                    }
                })
            }}
        />
    )

    return (
        <FlatList
            data={folders}
            renderItem={renderItem}
            numColumns={3}
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

