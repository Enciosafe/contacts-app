import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, TextInput } from "react-native";
import OutlinedButton from "../Ui/OutlinedButton";
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import {useDispatch} from "react-redux";
import {addContactAction} from "../store/contactsReducer";
import ImagePicker from "../components/ImagePicker";


const NewContact = ({route, navigation}) => {
    const incomeFolderId = route.params.folderId
    const dispatch = useDispatch()
    const [foldId, setFoldId] = useState('')
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [photo, setPhoto] = useState('');
    const [instagram, setInstagram] = useState('')



    useEffect(() => {
       setFoldId(incomeFolderId)
    }, [incomeFolderId]);



    const changeNameHandler = (enteredText) => {
        setName(enteredText)
    }
    const changeEmailHandler = (enteredText) => {
        setEmail(enteredText)
    }
    const changePhotoHandler = (enteredUrl) => {
        setPhoto(enteredUrl)
    }
    const changeInstagramHandler = (enteredAcc) => {
        setInstagram(enteredAcc)
    }

    const createContactHandler = () => {
        const newContact = {
            folderId: foldId,
            id: uuidv4(),
            name: name.toUpperCase(),
            email,
            photo,
            instagram: instagram.toLowerCase()
        }
        dispatch(addContactAction(newContact))
        navigation.goBack()
    }


    const cancelHandler = () => {
        navigation.goBack()
    }

    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.text}>ФИО</Text>
                <TextInput
                    value={name}
                    onChangeText={changeNameHandler}
                    style={[styles.input, styles.text]}
                />
            </View>
            <View>
                <Text style={styles.text}>EMAIL</Text>
                <TextInput
                    value={email}
                    onChangeText={changeEmailHandler}
                    style={[styles.input, styles.text]}
                />
            </View>
            <View>
                <Text style={styles.text}>INSTAGRAM ACCOUNT</Text>
                <TextInput
                    value={instagram}
                    onChangeText={changeInstagramHandler}
                    style={[styles.input, styles.text]}
                />
            </View>

            <View>
                <Text style={styles.text}>PHOTO</Text>
                <ImagePicker pictureHandler={changePhotoHandler}/>
            </View>
            <View>

                {/*<TextInput*/}
                {/*    value={photo}*/}
                {/*    onChangeText={changePhotoHandler}*/}
                {/*    style={[styles.input, styles.text]}*/}
                {/*/>*/}
            </View>

            <View style={[styles.actions, styles.text]}>
                <OutlinedButton icon="folder-open-outline" onPress={createContactHandler} >СОЗДАТЬ</OutlinedButton>
                <OutlinedButton icon="cut-outline" onPress={cancelHandler} >ОТМЕНИТЬ</OutlinedButton>
            </View>
        </View>

    );
};

export default NewContact;

const styles = StyleSheet.create({
    container: {
        marginTop: 10,
        marginHorizontal: 20,
    },
    input: {
        marginVertical: 8,
        paddingHorizontal: 8,
        paddingVertical: 8,
        fontSize: 16,
        backgroundColor: 'white',
        borderRadius: 5,
    },
    actions: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    text: {
        fontFamily: 'Qanelas-Regular',
    }
})


