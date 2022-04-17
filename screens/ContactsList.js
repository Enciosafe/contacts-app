import React from 'react';
import {View, Text, StyleSheet, FlatList} from "react-native";
import ContactItem from "../components/ContactItem";
import {contacts} from "../data/dummy";
import Folders from "./Folders";

const ContactsList = ({route}) => {


     // console.log('params',route.params)



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
                style={styles.container}
            />
        </>

    );
};

ContactsList.navigationOptions = ({route}) => {
    const { contactTitle } = route.params

    return {
        headerTitle: {contactTitle},
    }
}


export default ContactsList;

const styles = StyleSheet.create({
    container: {
        marginTop: 100,
    }
})
