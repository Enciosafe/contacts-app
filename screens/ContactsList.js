import React from 'react';
import {View, Text, StyleSheet, FlatList} from "react-native";
import ContactItem from "../components/ContactItem";
import {contacts} from "../data/dummy";

const ContactsList = ({route}) => {


     console.log('params',route.params)



    const renderItem = ({item}) => (
        <ContactItem
            id={item.id}
            name={item.name}
            imageUrl={item.imageUrl}
        />
    )

    return (
        <>
            <FlatList
                data={contacts}
                renderItem={renderItem}
                numColumns={3}
            />
        </>

    );
};


export default ContactsList;
