import React, {useEffect, useState} from 'react';
import {StyleSheet, FlatList} from "react-native";
import ContactItem from "../components/ContactItem";
import {useSelector} from "react-redux";
import {fetchContacts} from "../util/http";
import {setContactAction} from "../store/contactsReducer";
import LoadingOverlay from "../Ui/LoadingOverlay";
import {Colors} from "../assets/colors/Colors";

const ContactsList = ({route}) => {
    const insideFolderId = route.params.contactId
    const contacts = useSelector(state => state.contacts.contacts)
    const [fetchedContacts, setFetchedContacts] = useState([]);
    const [isFetching, setIsFetching] = useState(true)


    useEffect(() => {
        let isMounted = true;
        const getContacts = async () => {
            setIsFetching(true)
            const contacts = await fetchContacts()

            if(isMounted) {
                setFetchedContacts(contacts)
            }
        }
        setContactAction(contacts)
        getContacts()
        setIsFetching(false)
        return () => {
            isMounted = false
        }
    }, [fetchedContacts])


    const filteredContacts = fetchedContacts.filter((contact) => contact.folderId === insideFolderId)

    if(isFetching) {
        return <LoadingOverlay/>
    }


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
        backgroundColor: Colors.fill
    }
})
