import React, {useEffect, useState, useCallback} from 'react';
import {
    StyleSheet,
    FlatList,
    RefreshControl,
    Platform,
    TouchableWithoutFeedback,
    View,
    TextInput,
    KeyboardAvoidingView, Keyboard, Text
} from "react-native";
import ContactItem from "../components/ContactItem";
import {useSelector} from "react-redux";
import {fetchContacts} from "../util/http";
import {setContactAction} from "../store/contactsReducer";
import LoadingOverlay from "../Ui/LoadingOverlay";
import {Colors} from "../assets/colors/Colors";
import {getContacts, getUserId} from "../store/selectors";

const ContactsList = ({route}) => {
    const insideFolderId = route.params.contactId
    const contacts = useSelector(getContacts)
    const [fetchedContacts, setFetchedContacts] = useState([]);
    const [isFetching, setIsFetching] = useState(true)
    const [refresh, setRefresh] = useState(false)
    const {userId} = useSelector(getUserId)
    const [filterContacts, setFilterContacts] = useState('');
    const filteredContacts = fetchedContacts.filter((contact) => contact.folderId === insideFolderId)
    const filteredWithUserContacts = fetchedContacts.filter((contact) => contact.idFromUser === userId)




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


    const keyboardDismissHandler = () => {
        Keyboard.dismiss
        setFilterContacts('')
    }

    const upperFilterContacts = filterContacts.toUpperCase()
    const lowerFilterContacts = filterContacts.toLowerCase()
    const foundContacts = filteredWithUserContacts.filter(contact =>
         contact.description.includes(lowerFilterContacts) || contact.name.includes(upperFilterContacts) || contact.phone.includes(upperFilterContacts))



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
                data={filterContacts === '' ? filteredContacts : foundContacts}
                renderItem={renderItem}
                numColumns={2}
                style={styles.container}
            />
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} keyboardVerticalOffset={90}>
                <TouchableWithoutFeedback onPress={keyboardDismissHandler}>
                    <View style={styles.searchContainer}>
                        <TextInput
                            placeholder='SEARCH'
                            placeholderTextColor='gray'
                            maxLength={25}
                            value={filterContacts}
                            onChangeText={value => setFilterContacts(value)}
                            style={[styles.input, styles.text]}
                        />
                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </>

    );
};


export default ContactsList;

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.fill
    },
    searchContainer: {
        padding: 30,
        backgroundColor: 'black',
        borderWidth: 1,
        borderTopColor: Colors.accent,
    },
    input: {
        marginVertical: 8,
        paddingHorizontal: 8,
        paddingVertical: 8,
        fontSize: 16,
        backgroundColor: Colors.input,
        borderRadius: 5,
    },
    text: {
        fontFamily: 'Qanelas-Regular',
        color: 'black'
    },
})
