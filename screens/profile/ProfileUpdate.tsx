import React, {useEffect, useState} from 'react';
import {
    View,
    StyleSheet,
    Platform,
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    Keyboard, ScrollView,
} from 'react-native'
import OutlinedButton from "../../Ui/OutlinedButton";
import * as ImagePicker from "expo-image-picker";
import {useDispatch, useSelector} from "react-redux";
import {CompositeNavigationProp, useNavigation} from "@react-navigation/native";
import {updateUserInfoAction} from "../../store/userInfoReducer";
import {updateUserDataToStore} from "../../util/http";
import {Colors} from "../../assets/colors/Colors";
import FormInputItem from "../../components/FormInputItem";
import {getUserId} from "../../store/selectors";

interface ImagePickerUri {
    uri?: string,
    cancelled: boolean,
}


const ProfileUpdate: ({route}: { route: any }) => JSX.Element = ({route}) => {
    const params = route.params
    const {userId} = useSelector(getUserId)
    const navigation = useNavigation<CompositeNavigationProp<any, any>>()
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
        image: '',
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
                image: params?.image,
                photo: params?.photo,
                address: params?.address
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

    const pickImageFromRollHandler = async () => {
        let result: ImagePickerUri = await ImagePicker.launchImageLibraryAsync({
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
            facebook: inputValues['facebook'] !== '' ? inputValues['facebook'] : oldInfo.facebook,
            address: inputValues['address'] !== '' ? inputValues['address']: oldInfo.address,
        }
        dispatch(updateUserInfoAction(updatedUserData))
        await updateUserDataToStore(oldInfo.id, updatedUserData)
        navigation.navigate('Start')
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
                    <FormInputItem
                        title='ADDRESS'
                        keyboardType='url'
                        value={!inputValues['address'] ? oldInfo.address : inputValues['address']}
                        onChangeText={inputChangedHandler.bind(this, 'address')}
                        maxLength={250}
                    />
                    <View style={styles.actions}>
                        <OutlinedButton icon="close-circle-outline" onPress={cancelHandler} >[ CANCEL ]</OutlinedButton>
                        <OutlinedButton icon="image-outline" onPress={pickImageFromRollHandler} >[GALLERY]</OutlinedButton>
                        <OutlinedButton icon="caret-up-outline" onPress={updateInfoHandler} >[ CONFIRM ]</OutlinedButton>
                    </View>
                </ScrollView>
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
        backgroundColor: Colors.fill,
    },
    actions: {
        marginTop: 30,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    text: {
        fontFamily: 'Qanelas-Regular',
        color: 'gray'
    },
})
