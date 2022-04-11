import React from 'react';
import {View, Text, StyleSheet, FlatList} from "react-native";
import ContactItem from "../components/ContactItem";
import {contacts} from "../data/dummy";

const Contacts = ({route}) => {
    const contId = route.params.contactId

    const renderItem = ({item}) => (
        <ContactItem
            id={item.id}
            name={item.name}
            imageUrl={item.imageUrl}
        />
    )

    return (
        <>
            <Text>{contId}</Text>
            <FlatList
                data={contacts}
                renderItem={renderItem}
                numColumns={3}
            />
        </>

    );
};

export default Contacts;
