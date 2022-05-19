import React, {useEffect, useState} from 'react';
import {View, TextInput, StyleSheet, Text, Image, Alert} from "react-native";
import OutlinedButton from "../Ui/OutlinedButton";
import {useDispatch, useSelector} from "react-redux";
import {addFolderAction, updateFolderAction} from "../store/foldersReducer";
import * as ImagePicker from 'expo-image-picker';
import {addFolderToStore, fetchFolders, updateFolderToStore} from "../util/http";
import {Colors} from "../assets/colors/Colors";




const NewFolder = ({navigation, route}) => {
    const params = route.params
    const {userId} = useSelector(state => state.auth)
    const dispatch = useDispatch()
    const [title, setTitle] = useState('')
    const [image, setImage] = useState(null);
    const [oldFolder, setOldFolder] = useState({
            id:'',
            title: '',
            image: '',
        });


    useEffect(() => {
        if(params) {
            setOldFolder({
                id: params.folderId,
                title: params.folderTitle,
                image: params.folderImage
            })
        }
    }, [params]);


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
            idFromUser: userId,
            title: title.toUpperCase(),
            image: image
        }
        if(!title) {
            Alert.alert('Please enter the name')
            return
        }
        dispatch(addFolderAction(folder))
        addFolderToStore(folder)
        navigation.navigate('Folders')
    }

    const updateFolderHandler = async () => {
        const folder = {
            idFromUser: userId,
            title: title !== '' ? title.toUpperCase() : oldFolder.title,
            image: image !== null ? image : oldFolder.image
        }
        if(!title && oldFolder.title === '') {
            Alert.alert('Please enter the name')
            return
        }
        dispatch(updateFolderAction(folder))
        await updateFolderToStore(oldFolder.id, folder)
        await fetchFolders()
        navigation.navigate('Folders')
        Alert.alert('Folder was updated!')
    }


    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.text}>FOLDER NAME</Text>
                <TextInput
                    value={title === '' ? oldFolder.title : title}
                    onChangeText={changeTitleHandler}
                    style={[styles.input, styles.text]}
                />
            </View>
            <View style={[styles.actions, styles.text]}>
                {oldFolder.id === ''
                          ? <OutlinedButton icon="folder-open-outline" onPress={createFolderHandler} >CREATE</OutlinedButton>
                          : <OutlinedButton icon="push-outline" onPress={updateFolderHandler} >UPDATE</OutlinedButton>
                }
                {/*<OutlinedButton icon="folder-open-outline" onPress={createFolderHandler} >CREATE</OutlinedButton>*/}
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
        flex: 1,
        paddingTop: 10,
        paddingHorizontal: 20,
        alignItems: 'center',
        backgroundColor: Colors.fill,
        borderWidth: 1,
        borderLeftColor: Colors.accent,
        borderRightColor: Colors.accent,
    },
    input: {
        width: 300,
        height: 50,
        marginVertical: 8,
        paddingHorizontal: 8,
        paddingVertical: 8,
        fontSize: 16,
        backgroundColor: 'lightgray',
        borderRadius: 5,
    },
    actions: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    text: {
        fontFamily: 'Qanelas-Regular',
        color: 'gray',
        fontSize: 16
    },
    image: {
        borderWidth: 1,
        width: 200,
        height: 200,
        position: 'absolute',
        top: '150%',
        right: '15%'
    }
})
