import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, TextInput, Image, Alert, Platform, KeyboardAvoidingView, Keyboard, TouchableWithoutFeedback} from "react-native";
import OutlinedButton from "../Ui/OutlinedButton";
import 'react-native-get-random-values';
import {useDispatch} from "react-redux";
import {updateContactAction} from "../store/contactsReducer";
import * as ImagePicker from 'expo-image-picker';
import MyImagePicker from "../components/MyImagePicker";
import {updateContactToStore} from "../util/http";
import {Colors} from "../assets/colors/Colors";
import * as FileSystem from "expo-file-system";
import {CompositeNavigationProp, useNavigation} from "@react-navigation/native";




const UpdateContact = ({route}) => {
    const navigation = useNavigation<CompositeNavigationProp<any, any>>()
    const params = route.params

    const incomeFolderId = route.params.id
    const dispatch = useDispatch()
    const [foldId, setFoldId] = useState('')
    const [image, setImage] = useState(null);
    const [oldInfo, setOldInfo] = useState({
        id:'',
        name: '',
        description: '',
        phone: '',
        email: '',
        instagram: '',
        telegram: '',
        whatsUp: '',
        facebook: '',
        photo: '',
        address: '',
    });

    useEffect(() => {
        if(params) {
            setOldInfo({
                id: params?.id,
                name: params?.name,
                description: params?.description,
                phone: params?.phone,
                email: params?.email,
                instagram: params?.instagram,
                telegram: params?.telegram,
                whatsUp: params?.whatsUp,
                facebook: params?.facebook,
                photo: params?.photo,
                address: params?.address
            })
        }
    }, [params]);

    useEffect(() => {
        setFoldId(incomeFolderId)
    }, [incomeFolderId]);

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


    const getBase64 = async (path) => {
        await FileSystem.readAsStringAsync(path, { encoding: 'base64' })
            .then(base64 => setImage(base64))
            .catch(err => console.log(err))
    }

    const pickImageFromRollHandler = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true
        })

        if(!result.cancelled) {
            // @ts-ignore
            await getBase64(result.uri)
        }
    }

    const changePhotoHandler = async (enteredUrl) => {
        await getBase64(enteredUrl)
    }

    const updateContactHandler = async () => {
        const updatedContact = {
            name: inputValues['name'] !== '' ? inputValues['name'].toUpperCase() : oldInfo.name,
            description: inputValues['description'] !== '' ? inputValues['description'].toLowerCase() : oldInfo.description,
            email: inputValues['email'] !== '' ? inputValues['email'] : oldInfo.email,
            phone: inputValues['phone'] !== '' ? inputValues['phone'] : oldInfo.phone,
            photo: image !== null ? `data:image/png;base64,${image}` : oldInfo.photo,
            instagram: inputValues['instagram'] !== '' ? inputValues['instagram'] : oldInfo.instagram,
            telegram: inputValues['telegram'] !== '' ? inputValues['telegram'].slice(1) : oldInfo.telegram,
            whatsUp: inputValues['whatsUp'] !== '' ? inputValues['whatsUp'] : oldInfo.whatsUp,
            facebook: inputValues['facebook'] !== '' ? inputValues['facebook'] : oldInfo.facebook,
            address: inputValues['address'] !== '' ? inputValues['address']: oldInfo.address,
        }
        dispatch(updateContactAction(updatedContact))
        await updateContactToStore(foldId, updatedContact).catch(e => console.log(e))
        await Alert.alert('Contact was updated!')
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
                        placeholder='NAME'
                        placeholderTextColor='gray'
                        maxLength={25}
                        value={!inputValues['name'] ? oldInfo.name : inputValues['name']}
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
                        value={!inputValues['phone'] ? oldInfo.phone : inputValues['phone']}
                        onChangeText={inputChangedHandler.bind(this, 'phone')}
                        style={[styles.input, styles.text]}
                    />
                </View>
                <View>
                    <TextInput
                        placeholder='EMAIL'
                        placeholderTextColor='gray'
                        maxLength={25}
                        value={!inputValues['email'] ? oldInfo.email : inputValues['email']}
                        onChangeText={inputChangedHandler.bind(this, 'email')}
                        style={[styles.input, styles.text]}
                    />
                </View>
                <View>
                    <TextInput
                        keyboardType='url'
                        placeholder='INSTAGRAM (link)'
                        placeholderTextColor='gray'
                        value={!inputValues['instagram'] ? oldInfo.instagram : inputValues['instagram']}
                        onChangeText={inputChangedHandler.bind(this, 'instagram')}
                        style={[styles.input, styles.text]}
                    />
                </View>
                <View>
                    <TextInput
                        placeholder='USER NAME TELEGRAM (include "@")'
                        placeholderTextColor='gray'
                        maxLength={25}
                        value={!inputValues['telegram'] ? oldInfo.telegram : inputValues['telegram']}
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
                        value={!inputValues['whatsUp'] ? oldInfo.whatsUp : inputValues['whatsUp']}
                        onChangeText={inputChangedHandler.bind(this, 'whatsUp')}
                        style={[styles.input, styles.text]}
                    />
                </View>
                <View>
                    <TextInput
                        keyboardType='url'
                        placeholder='FACEBOOK (link)'
                        placeholderTextColor='gray'
                        value={!inputValues['facebook'] ? oldInfo.facebook : inputValues['facebook']}
                        onChangeText={inputChangedHandler.bind(this, 'facebook')}
                        style={[styles.input, styles.text]}
                    />
                </View>
                <View>
                    <TextInput
                        placeholder='ADDRESS'
                        placeholderTextColor='gray'
                        maxLength={200}
                        value={!inputValues['address'] ? oldInfo.address : inputValues['address']}
                        onChangeText={inputChangedHandler.bind(this, 'address')}
                        style={[styles.input, styles.text]}
                    />
                </View>
                <View>
                    <TextInput
                        placeholder='ADDITIONAL NOTE'
                        placeholderTextColor='gray'
                        maxLength={200}
                        value={!inputValues['description'] ? oldInfo.description : inputValues['description']}
                        onChangeText={inputChangedHandler.bind(this, 'description')}
                        style={[styles.input, styles.text]}
                    />
                </View>

                <View>
                    <Text style={styles.text}>MAKE PHOTO</Text>
                    {image && <Image source={{ uri: image }} style={styles.imagePreview} />}
                    {!image ? <MyImagePicker pictureHandler={changePhotoHandler}/> : null }
                    {!image ? <OutlinedButton icon="image-outline" onPress={pickImageFromRollHandler}>TAKE FROM GALLERY</OutlinedButton> : null}
                </View>
                <View style={styles.actions}>
                    <OutlinedButton icon="folder-open-outline" onPress={updateContactHandler} >UPDATE</OutlinedButton>
                    <OutlinedButton icon="cut-outline" onPress={cancelHandler} >CANCEL</OutlinedButton>

                </View>
            </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
    );
};

export default UpdateContact;

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


