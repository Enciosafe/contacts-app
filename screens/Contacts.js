import React from 'react';
import {View, Text, StyleSheet, FlatList} from "react-native";
import ContactItem from "../components/ContactItem";
import {contacts} from "../data/dummy";

const Contacts = () => {

    const renderItem = ({item}) => (
        <ContactItem
            id={item.id}
            name={item.name}
            imageUrl={item.imageUrl}
            // phone={item.phone}
            // email={item.email}
            // address={item.address}
            // instagram={item.instagram}
            // facebook={item.facebook}
            // twitter={item.twitter}
            // telegram={item.telegram}
        />
    )

    return (
        <FlatList
            data={contacts}
            renderItem={renderItem}
            numColumns={3}
        />
    );
};

export default Contacts;
