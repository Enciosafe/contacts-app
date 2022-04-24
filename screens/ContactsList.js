import React, {useEffect, useState} from 'react';
import {StyleSheet, FlatList} from "react-native";
import ContactItem from "../components/ContactItem";
import {useSelector} from "react-redux";
import {fetchContacts} from "../util/http";
import {setContactAction} from "../store/contactsReducer";

const ContactsList = ({route}) => {
    const insideFolderId = route.params.contactId
    const contacts = useSelector(state => state.contacts.contacts)
    const [fetchedContacts, setFetchedContacts] = useState([]);

    useEffect(() => {
        const getContacts = async () => {
            const contacts = await fetchContacts()
             setFetchedContacts(contacts)
        }
        getContacts()
        setContactAction(contacts)
        return () => {

        }
    }, [fetchedContacts])



    const filteredContacts = fetchedContacts.filter((contact) => contact.folderId === insideFolderId)




    const renderItem = ({item}) => (
        <ContactItem
            props={item}
        />
    )

    return (
        <>
            <FlatList
                data={filteredContacts}
                renderItem={renderItem}
                numColumns={2}
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
