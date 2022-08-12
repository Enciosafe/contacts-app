import React, {useState} from 'react';
import {
    View,
    StyleSheet,
    TextInput,
    Platform,
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    Keyboard, Image, Alert
} from 'react-native'
import MyImagePicker from "../../components/MyImagePicker";
import OutlinedButton from "../../Ui/OutlinedButton";
import * as ImagePicker from "expo-image-picker";
import {useDispatch, useSelector} from "react-redux";
import {useNavigation} from "@react-navigation/native";
import {addUserInfoAction} from "../../store/userInfoReducer";
import {addUserDataToStore} from "../../util/http";
import {Colors} from "../../assets/colors/Colors";

const ProfileForm = () => {

    const {userId} = useSelector(state => state.auth)
    const navigation = useNavigation()
    const dispatch = useDispatch()


    const [photo, setPhoto] = useState(null);
    const [image, setImage] = useState(null)
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

    const changePhotoHandler = (enteredUrl) => {
        setPhoto(enteredUrl)
    }

    const cancelHandler = () => {
        navigation.goBack()
    }

    const createInfoHandler = () => {
        const newUserData = {
            idFromUser: userId,
            name: inputValues['name'].toUpperCase(),
            description: inputValues['description'].toLowerCase(),
            address: inputValues['address'],
            email: inputValues['email'],
            phone: inputValues['phone'],
            photo: photo || image,
            instagram: inputValues['instagram'],
            telegram: inputValues['telegram'].slice(1),
            whatsUp: inputValues['whatsUp'],
            facebook: inputValues['facebook']
        }
        if(!inputValues['name']) {
            Alert.alert('Please enter the name')
            return
        }
        dispatch(addUserInfoAction(newUserData))
        addUserDataToStore(newUserData)
        navigation.navigate('Start')
    }




    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <KeyboardAvoidingView
                style={styles.container}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                keyboardVerticalOffset={2}>
                <View>
                    <TextInput
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
                        value={inputValues['email']}
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
                        autocomplete={true}
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
                        autocomplete={true}
                        placeholder='ADDITIONAL NOTE'
                        placeholderTextColor='gray'
                        maxLength={200}
                        value={inputValues['description']}
                        onChangeText={inputChangedHandler.bind(this, 'description')}
                        style={[styles.input, styles.text]}
                    />
                </View>

                <View style={{marginTop: 20}}>
                    {image && <Image source={{ uri: image }} style={styles.imagePreview} />}
                    {!image ? <MyImagePicker pictureHandler={changePhotoHandler}/> : null }
                    {!photo ? <OutlinedButton icon="image-outline" onPress={pickImageFromRollHandler}>TAKE FROM GALLERY</OutlinedButton> : null}
                </View>

                <View style={[styles.actions, styles.text]}>
                    <OutlinedButton icon="folder-open-outline" onPress={createInfoHandler} >CREATE</OutlinedButton>
                    <OutlinedButton icon="cut-outline" onPress={cancelHandler} >CANCEL</OutlinedButton>

                </View>
            </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
    );
};

export default ProfileForm;

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
        alignItems: 'center'
    },
})
