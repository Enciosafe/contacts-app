import React, {useEffect} from 'react';
import {Pressable, StyleSheet, Text, View} from "react-native";
import {useNavigation} from "@react-navigation/native";
import {useDispatch} from "react-redux";
import {removeFolderAction} from "../store/foldersReducer";


const FolderItem = ({id, title }) => {

    const dispatch = useDispatch()

    const navigation = useNavigation()

    const onRemoveFolder = (id) => {

        dispatch(removeFolderAction(id))
        console.log('llooooong')
        console.log(id)
    }


    const onOpenContactHandler = () => {
        navigation.navigate('Contacts')
    }
    return (
        <Pressable
            style={({pressed}) => [styles.box, pressed && styles.pressed]}
            onPress={onOpenContactHandler}
            delayLongPress={1000}
            onLongPress={() => onRemoveFolder(id)}
        >
            <View style={styles.titleBox}>
                <Text style={styles.insideText}>{title}</Text>
            </View>
        </Pressable>
    );
};

export default FolderItem;

const styles = StyleSheet.create({
    box: {
        marginHorizontal: 5,
        marginTop: 10,
        width: 120,
        height: 120,
        backgroundColor: 'white',
        borderWidth: 3,
        borderColor: 'black',
        borderRadius: 15,

    },
    titleBox: {
        marginTop: 80,
        backgroundColor: 'gray',
        opacity: .5,
    },
    insideText: {
        textAlign: 'center',
        color: 'black',
        fontSize: 16,
    },
    pressed: {
        opacity: .7,
        backgroundColor: 'black'
    }
})
