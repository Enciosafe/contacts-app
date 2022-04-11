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
            title,
            description

        }
        dispatch(addFolderAction(folder))
        navigation.navigate('Folders')
    }


    return (
        <View style={styles.container}>
            <View>
                <Text>Title</Text>
                <TextInput
                    value={title}
                    onChangeText={changeTitleHandler}
                    style={styles.input}
                />
            </View>
            <View>
                <Text>Description</Text>
                <TextInput
                    value={description}
                    onChangeText={changeDescriptionHandler}
                    style={styles.input}
                />
            </View>
            <View style={styles.actions}>
                <OutlinedButton icon="folder-open-outline" onPress={createFolderHandler} >CREATE</OutlinedButton>
                <OutlinedButton icon="cut-outline" onPress={cancelHandler} >CANCEL</OutlinedButton>
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
    }
})
