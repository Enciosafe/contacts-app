import React from 'react';
import {View, Text, StyleSheet, FlatList} from "react-native";
import ContactItem from "../components/ContactItem";
import {useSelector} from "react-redux";

const ContactsList = ({route}) => {

    const insideFolderId = route.params.contactId
    const contacts = useSelector(state => state.contacts.contacts)
    const filteredContacts = contacts.filter((contact) => contact.folderId === insideFolderId)


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
                data={filteredContacts}
                renderItem={renderItem}
                numColumns={3}
                style={styles.container}
            />
        </>

    );
};

ContactsList.navigationOptions = ({route}) => {
    const { contactTitle } = route.params
    const { contactId } = route.params
    console.log(contactId)

    return {
        headerTitle: {contactTitle}
    }
}


export default ContactsList;

const styles = StyleSheet.create({
    container: {
        marginTop: 100,
    }
})
