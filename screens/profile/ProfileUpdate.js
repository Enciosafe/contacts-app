import React, {useEffect, useState} from 'react';
import {
    View,
    StyleSheet,
    Platform,
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    Keyboard, Image, Alert, ScrollView
} from 'react-native'
import OutlinedButton from "../../Ui/OutlinedButton";
import * as ImagePicker from "expo-image-picker";
import {useDispatch, useSelector} from "react-redux";
import {useNavigation} from "@react-navigation/native";
import {updateUserInfoAction} from "../../store/userInfoReducer";
import {updateUserDataToStore} from "../../util/http";
import {Colors} from "../../assets/colors/Colors";
import FormInputItem from "../../components/FormInputItem";

const ProfileUpdate = ({route}) => {
    const params = route.params
    const {userId} = useSelector(state => state.auth)
    const navigation = useNavigation()
    const dispatch = useDispatch()
    const [image, setImage] = useState('')
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
        image: ''
    });


    useEffect(() => {
        if(params) {
            setOldInfo({
                id: params.id,
                name: params.name,
                description: params.description,
                phone: params.phone,
                email: params.email,
                instagram: params.instagram,
                telegram: params.telegram,
                whatsUp: params.whatsUp,
                facebook: params.facebook,
                image: params.image
            })
        }
    }, [params]);



    const [inputValues, setInputValues] = useState({
        name: '',
        description: '',
        phone: '',
        email: '',
        instagram: '',
        telegram: '',
        whatsUp: '',
        facebook: '',
        image: ''
    })


    const inputChangedHandler = (inputIdentifier, enteredValue) => {
        setInputValues((currentInputValues) => {
            return {
                ...currentInputValues,
                [inputIdentifier]: enteredValue
            }
        })
    }

    const pickImageFromRollHandler = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true
        })

        if(!result.cancelled) {
            setImage(result.uri)
        }
    }

    const cancelHandler = () => {
        navigation.goBack()
    }

    const updateInfoHandler = async () => {
        const updatedUserData = {
            idFromUser: userId,
            name: inputValues['name'] !== '' ? inputValues['name'].toUpperCase() : oldInfo.name,
            email: inputValues['email'] !== '' ? inputValues['email'] : oldInfo.email,
            phone: inputValues['phone'] !== '' ? inputValues['phone'] : oldInfo.phone,
            photo: image !== '' ? image : oldInfo.photo,
            instagram: inputValues['instagram'] !== '' ? inputValues['instagram'] : oldInfo.instagram,
            telegram: inputValues['telegram'] !== '' ? inputValues['telegram'].slice(1) : oldInfo.telegram,
            whatsUp: inputValues['whatsUp'] !== '' ? inputValues['whatsUp'] : oldInfo.whatsUp,
            facebook: inputValues['facebook'] !== '' ? inputValues['facebook'] : oldInfo.facebook
        }
        dispatch(updateUserInfoAction(updatedUserData))
        await updateUserDataToStore(oldInfo.id, updatedUserData)
        navigation.navigate('Start')
        Alert.alert('User Information was updated')
    }

    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <KeyboardAvoidingView
                style={styles.container}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                keyboardVerticalOffset={2}>
                <ScrollView>
                    <FormInputItem
                        title='NAME'
                        maxLength={25}
                        value={!inputValues['name'] ? oldInfo.name : inputValues['name']}
                        onChangeText={inputChangedHandler.bind(this, 'name')}
                        keyboardType={'default'}
                    />
                    <FormInputItem
                        title='PHONE'
                        maxLength={25}
                        value={!inputValues['phone'] ? oldInfo.phone : inputValues['phone']}
                        onChangeText={inputChangedHandler.bind(this, 'phone')}
                        keyboardType='phone-pad'
                    />
                    <FormInputItem
                        title='EMAIL'
                        maxLength={25}
                        value={!inputValues['email'] ? oldInfo.email : inputValues['email']}
                        onChangeText={inputChangedHandler.bind(this, 'email')}
                        keyboardType={'email-address'}
                    />
                    <FormInputItem
                        title='INSTAGRAM (link)'
                        value={!inputValues['instagram'] ? oldInfo.instagram : inputValues['instagram']}
                        onChangeText={inputChangedHandler.bind(this, 'instagram')}
                        maxLength={250}
                        keyboardType='url'
                    />
                    <FormInputItem
                        title='TELEGRAM (include "@")'
                        maxLength={25}
                        value={!inputValues['telegram'] ? oldInfo.telegram : inputValues['telegram']}
                        onChangeText={inputChangedHandler.bind(this, 'telegram')}
                        keyboardType={'default'}
                    />
                    <FormInputItem
                        title='WHATSAPP NUMBER (just numbers)'
                        keyboardType='phone-pad'
                        maxLength={25}
                        value={!inputValues['whatsUp'] ? oldInfo.whatsUp : inputValues['whatsUp']}
                        onChangeText={inputChangedHandler.bind(this, 'whatsUp')}
                    />
                    <FormInputItem
                        title='FACEBOOK (link)'
                        keyboardType='url'
                        value={!inputValues['facebook'] ? oldInfo.facebook : inputValues['facebook']}
                        onChangeText={inputChangedHandler.bind(this, 'facebook')}
                        maxLength={250}
                    />
                </ScrollView>
                <View>
                    {image && <Image source={{ uri: image }} style={styles.imagePreview} />}
                    <OutlinedButton icon="image-outline" onPress={pickImageFromRollHandler}>TAKE FROM GALLERY</OutlinedButton>
                </View>
                <View style={[styles.actions, styles.text]}>
                    <OutlinedButton icon="caret-up-outline" onPress={updateInfoHandler} >[ CONFIRM ]</OutlinedButton>
                    <OutlinedButton icon="close-circle-outline" onPress={cancelHandler} >[ CANCEL ]</OutlinedButton>
                </View>
            </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
    );
};

export default ProfileUpdate;

const styles = StyleSheet.create({
    container: {
        height: '100%',
        paddingTop: 10,
        paddingHorizontal: 20,
        backgroundColor: Colors.fill
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
        color: 'gray'
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
        backgroundColor: Colors.fill,
        borderRadius: 4
    },
    actions: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
})
