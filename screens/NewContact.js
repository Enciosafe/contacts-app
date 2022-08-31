import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, TextInput, Image, Alert, Platform, KeyboardAvoidingView, Keyboard, TouchableWithoutFeedback} from "react-native";
import OutlinedButton from "../Ui/OutlinedButton";
import 'react-native-get-random-values';
import {useDispatch, useSelector} from "react-redux";
import {addContactAction} from "../store/contactsReducer";
import * as ImagePicker from 'expo-image-picker';
import MyImagePicker from "../components/MyImagePicker";
import {addContactToStore} from "../util/http";
import {Colors} from "../assets/colors/Colors";
import {resizeImg} from "../util/resizeImg";




const NewContact = ({route, navigation}) => {
    const incomeFolderId = route.params.folderId
    const dispatch = useDispatch()
    const [foldId, setFoldId] = useState('')
    const {userId} = useSelector(state => state.auth)

    const [photo, setPhoto] = useState(null);
    const [image, setImage] = useState(null);
    const [inputValues, setInputValues] = useState({
        name: '',
        description: '',
        phone: '',
        email: '',
        instagram: '',
        telegram: '',
        whatsUp: '',
        facebook: '',
        image: '',
        address: '',
    })

    const inputChangedHandler = (inputIdentifier, enteredValue) => {
        setInputValues((currentInputValues) => {
            return {
                ...currentInputValues,
            [inputIdentifier]: enteredValue
            }
        })
    }

    useEffect(() => {
       setFoldId(incomeFolderId)
    }, [incomeFolderId]);


    const pickImageFromRollHandler = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true
        })

        await resizeImg(result.uri, setImage, 600)

    }

    const changePhotoHandler = async (enteredUrl) => {
        await resizeImg(enteredUrl, setPhoto, 600)
    }

    const createContactHandler = () => {
        if(!photo) {
            setPhoto(require('../assets/img/logo2.png'))
        }
        const newContact = {
            idFromUser: userId,
            folderId: foldId,
            name: inputValues['name'].toUpperCase(),
            description: inputValues['description'].toLowerCase(),
            email: inputValues['email'],
            phone: inputValues['phone'],
            photo: image ? `data:image/png;base64,${image}` : `data:image/png;base64,${photo}`,
            instagram: inputValues['instagram'],
            telegram: inputValues['telegram'].slice(1),
            whatsUp: inputValues['whatsUp'],
            facebook: inputValues['facebook'],
            address: inputValues['address'],
        }
        if(!inputValues['name']) {
            Alert.alert('Please enter the name')
            return
        }
        dispatch(addContactAction(newContact))
        addContactToStore(newContact)
        navigation.goBack()
    }


    const cancelHandler = () => {
        navigation.goBack()
    }

    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <KeyboardAvoidingView
                style={styles.container}
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                keyboardVerticalOffset={2}
            >
                <View>
                    <TextInput
                        autocomplete={true}
                        placeholder='NAME'
                        placeholderTextColor='gray'
                        maxLength={25}
                        value={inputValues['name']}
                        onChangeText={inputChangedHandler.bind(this, 'name')}
                        style={[styles.input, styles.text]}
                    />
                </View>
                <View>
                    <TextInput
                        placeholder='PHONE'
                        placeholderTextColor='gray'
                        maxLength={25}
                        keyboardType='phone-pad'
                        value={inputValues['phone']}
                        onChangeText={inputChangedHandler.bind(this, 'phone')}
                        style={[styles.input, styles.text]}
                    />
                </View>
                <View>
                    <TextInput
                        autocomplete={true}
                        placeholder='EMAIL'
                        placeholderTextColor='gray'
                        maxLength={25}
                        value={inputValues['email'].toLowerCase()}
                        onChangeText={inputChangedHandler.bind(this, 'email')}
                        style={[styles.input, styles.text]}
                    />
                </View>
                <View>
                    <TextInput
                        keyboardType='url'
                        placeholder='INSTAGRAM (link)'
                        placeholderTextColor='gray'
                        value={inputValues['instagram']}
                        onChangeText={inputChangedHandler.bind(this, 'instagram')}
                        style={[styles.input, styles.text]}
                    />
                </View>
                <View>
                    <TextInput
                        autocomplete={true}
                        placeholder='USER NAME TELEGRAM (include "@")'
                        placeholderTextColor='gray'
                        maxLength={25}
                        value={inputValues['telegram']}
                        onChangeText={inputChangedHandler.bind(this, 'telegram')}
                        style={[styles.input, styles.text]}
                    />
                </View>
                <View>
                    <TextInput
                        keyboardType='phone-pad'
                        placeholder='WHATSAPP NUMBER (just numbers)'
                        placeholderTextColor='gray'
                        maxLength={25}
                        value={inputValues['whatsUp']}
                        onChangeText={inputChangedHandler.bind(this, 'whatsUp')}
                        style={[styles.input, styles.text]}
                    />
                </View>
                <View>
                    <TextInput
                        keyboardType='url'
                        placeholder='FACEBOOK (link)'
                        placeholderTextColor='gray'
                        value={inputValues['facebook']}
                        onChangeText={inputChangedHandler.bind(this, 'facebook')}
                        style={[styles.input, styles.text]}
                    />
                </View>
                <View>
                    <TextInput
                        placeholder='ADDRESS'
                        placeholderTextColor='gray'
                        maxLength={200}
                        value={inputValues['address']}
                        onChangeText={inputChangedHandler.bind(this, 'address')}
                        style={[styles.input, styles.text]}
                    />
                </View>
                <View>
                    <TextInput
                        placeholder='ADDITIONAL NOTE'
                        placeholderTextColor='gray'
                        maxLength={200}
                        value={inputValues['description']}
                        onChangeText={inputChangedHandler.bind(this, 'description')}
                        style={[styles.input, styles.text]}
                    />
                </View>

                <View>
                    <Text style={styles.text}>MAKE PHOTO</Text>
                    {image && <Image source={{ uri: image }} style={styles.imagePreview} />}
                    {!image ? <MyImagePicker pictureHandler={changePhotoHandler}/> : null }
                    {!photo ? <OutlinedButton icon="image-outline" onPress={pickImageFromRollHandler}>TAKE FROM GALLERY</OutlinedButton> : null}
                </View>
                <View style={[styles.actions, styles.text]}>
                    <OutlinedButton icon="folder-open-outline" onPress={createContactHandler} >CREATE</OutlinedButton>
                    <OutlinedButton icon="cut-outline" onPress={cancelHandler} >CANCEL</OutlinedButton>

                </View>
            </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
    );
};

export default NewContact;

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 40,
        width: '100%',
        height: '100%',
        borderWidth: 1,
        backgroundColor: Colors.fill,
        borderLeftColor: Colors.accent,
        borderRightColor: Colors.accent
    },
    input: {
        marginVertical: 8,
        paddingHorizontal: 8,
        paddingVertical: 8,
        fontSize: 16,
        backgroundColor: Colors.input,
        borderRadius: 5,
    },
    actions: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    text: {
        fontFamily: 'Qanelas-Regular',
        color: 'black'
    },
    image: {
        borderWidth: 1,
        width: 200,
        height: 200,
        position: 'absolute',
        top: '150%',
        right: '25%'
    },
    imagePreview: {
        width: 100,
        height: 100,
        marginVertical: 8,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'black',
        borderRadius: 4
    },
})


