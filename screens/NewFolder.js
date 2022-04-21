import React, {useState} from 'react';
import {View, TextInput, StyleSheet, Text, Image} from "react-native";
import OutlinedButton from "../Ui/OutlinedButton";
import {useDispatch} from "react-redux";
import {addFolderAction} from "../store/foldersReducer";
import * as ImagePicker from 'expo-image-picker';




const NewFolder = ({navigation}) => {
    const dispatch = useDispatch()
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
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

    const changeDescriptionHandler = (enteredText) => {
        setDescription(enteredText)
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
            id: new Date().toString() + Math.random().toString(),
            title: title.toUpperCase(),
            image: image,
            description

        }
        dispatch(addFolderAction(folder))
        navigation.navigate('Folders')
    }


    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.text}>НАЗВАНИЕ</Text>
                <TextInput
                    value={title}
                    onChangeText={changeTitleHandler}
                    style={[styles.input, styles.text]}
                />
            </View>
            <View style={[styles.actions, styles.text]}>
                <OutlinedButton icon="folder-open-outline" onPress={createFolderHandler} >СОЗДАТЬ</OutlinedButton>
                <OutlinedButton icon="cut-outline" onPress={cancelHandler} >ОТМЕНИТЬ</OutlinedButton>
                <OutlinedButton icon="image-outline" onPress={pickImageFromRollHandler}>ОБЛОЖКА</OutlinedButton>
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
