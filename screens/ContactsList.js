import React from 'react';
import {StyleSheet, FlatList} from "react-native";
import ContactItem from "../components/ContactItem";
import {useSelector} from "react-redux";

const ContactsList = ({route}) => {

    const insideFolderId = route.params.contactId
    const contacts = useSelector(state => state.contacts.contacts)
    const filteredContacts = contacts.filter((contact) => contact.folderId === insideFolderId)


    const renderItem = ({item}) => (
        <ContactItem
            props={item}
            // id={item.id}
            // name={item.name}
            // photo={item.photo}
            // email={item.email}
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


export default ContactsList;

const styles = StyleSheet.create({
    container: {
        width: '100%',
        marginTop: 100,
    }
})
