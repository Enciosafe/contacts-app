import React, {useState} from 'react';
import {View, TextInput, StyleSheet, Text, Image, Alert} from "react-native";
import OutlinedButton from "../Ui/OutlinedButton";
import {useDispatch} from "react-redux";
import {addFolderAction} from "../store/foldersReducer";
import * as ImagePicker from 'expo-image-picker';
import {addFolderToStore} from "../util/http";




const NewFolder = ({navigation}) => {
    const dispatch = useDispatch()
    const [title, setTitle] = useState('')
    const [image, setImage] = useState(null);

    const pickImageFromRollHandler = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: false
        })

        if(!result.cancelled) {
            setImage(result.uri)
        }
    }

    const changeTitleHandler = (enteredText) => {
        setTitle(enteredText)
    }

    const cancelHandler = () => {
        navigation.navigate('Folders')
    }

    const createFolderHandler = () => {
        const commonImg = require('../assets/img/switz.png')
        if(!image) {
            setImage(commonImg)
        }

        const folder = {
            title: title.toUpperCase(),
            image: image
        }
        if(!title) {
            Alert.alert('Please enter the name')
            navigation.navigate('Folders')
            return
        }
        dispatch(addFolderAction(folder))
        addFolderToStore(folder)

        navigation.navigate('Folders')
    }


    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.text}>FOLDER NAME</Text>
                <TextInput
                    value={title}
                    onChangeText={changeTitleHandler}
                    style={[styles.input, styles.text]}
                />
            </View>
            <View style={[styles.actions, styles.text]}>
                <OutlinedButton icon="folder-open-outline" onPress={createFolderHandler} >CREATE</OutlinedButton>
                <OutlinedButton icon="cut-outline" onPress={cancelHandler} >CANCEL</OutlinedButton>
                <OutlinedButton icon="image-outline" onPress={pickImageFromRollHandler}>PICTURE</OutlinedButton>
                    {image && <Image source={{ uri: image }} style={styles.image} />}
            </View>
        </View>

    );
};

export default NewFolder;

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
    },
    image: {
        borderWidth: 1,
        width: 200,
        height: 200,
        position: 'absolute',
        top: '150%',
        right: '25%'
    }
})
