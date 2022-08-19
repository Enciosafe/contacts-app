import React, {useEffect, useState, useCallback} from 'react';
import {StyleSheet, FlatList, RefreshControl} from "react-native";
import ContactItem from "../components/ContactItem";
import {useSelector} from "react-redux";
import {fetchContacts} from "../util/http";
import {setContactAction} from "../store/contactsReducer";
import LoadingOverlay from "../Ui/LoadingOverlay";
import {Colors} from "../assets/colors/Colors";
import {getContacts} from "../store/selectors";

const ContactsList = ({route}) => {
    const insideFolderId = route.params.contactId
    const contacts = useSelector(getContacts)
    const [fetchedContacts, setFetchedContacts] = useState([]);
    const [isFetching, setIsFetching] = useState(true)
    const [refresh, setRefresh] = useState(false)


    const handleRefresh = useCallback(
        () => {
            let isMounted = true;
            const getContacts = async () => {
                setIsFetching(true)
                const contacts = await fetchContacts()

                if(isMounted) {
                    setFetchedContacts(contacts)
                }
                setContactAction(contacts)
            }
            getContacts().catch(e => console.log(e.message))
            setIsFetching(false)
            setRefresh(false)
            return () => {
                isMounted = false
            }
    }, [fetchedContacts])


    useEffect(() => {
        let isMounted = true;
        const getContacts = async () => {
            setIsFetching(true)
            const contacts = await fetchContacts()

            if(isMounted) {
                setFetchedContacts(contacts)
            }
            setContactAction(contacts)
        }
        getContacts().catch(e => console.log(e.message))
        setIsFetching(false)
        return () => {
            isMounted = false
        }
    }, [fetchedContacts, contacts])


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
                refreshControl={
                    <RefreshControl
                        refreshing={refresh}
                        onRefresh={handleRefresh}
                        tintColor={Colors.accent}
                    />
                }
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
