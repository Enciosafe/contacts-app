import React, {useState} from 'react';
import {View, TextInput, StyleSheet, Text} from "react-native";
import OutlinedButton from "../Ui/OutlinedButton";
import {useDispatch} from "react-redux";
import {addFolderAction} from "../store/foldersReducer";




const NewFolder = ({navigation}) => {
    const dispatch = useDispatch()
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')


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
        const folder = {
            id: new Date().toString() + Math.random().toString(),
            title: title.toUpperCase(),
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
            <View>
                <Text style={styles.text}>ОПИСАНИЕ</Text>
                <TextInput
                    value={description}
                    onChangeText={changeDescriptionHandler}
                    style={[styles.input, styles.text]}
                />
            </View>
            <View style={[styles.actions, styles.text]}>
                <OutlinedButton icon="folder-open-outline" onPress={createFolderHandler} >СОЗДАТЬ</OutlinedButton>
                <OutlinedButton icon="cut-outline" onPress={cancelHandler} >ОТМЕНИТЬ</OutlinedButton>
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
    }
})
