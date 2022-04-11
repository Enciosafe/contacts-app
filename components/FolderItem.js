import React from 'react';
import {Alert, Pressable, StyleSheet, Text, View, Image} from "react-native";
import {useNavigation} from "@react-navigation/native";
import {useDispatch} from "react-redux";
import {removeFolderAction} from "../store/foldersReducer";
import image from "../assets/img/switz.png";




const FolderItem = ({onSelect, id, title }) => {

    const image1 = require('../assets/img/switz.png')
    const image2 = require('../assets/img/ukraine.png')
    const dispatch = useDispatch()

    const navigation = useNavigation()

    const onRemoveFolder = (id) => {
        Alert.alert('Удаление папки', 'Уверены что хотите удалить эту папку?',[
            {
                text: "Нет",
                onPress: () => Alert.alert("Не удаляем"),
                style: "default",
            },
            {
                text: "Удалить",
                onPress: () => dispatch(removeFolderAction(id)),
                style: "default"
            }
        ])
    }


    const onOpenContactHandler = () => {
        navigation.navigate('Contacts')
    }
    return (
        <Pressable
            style={({pressed}) => [styles.box, pressed && styles.pressed]}
            onPress={onSelect}
            onLongPress={() => onRemoveFolder(id)}
        >
            <Image source={image1}/>
            <View style={styles.titleBox}>
                <Text style={styles.insideText}>{title.toUpperCase()}</Text>
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
        borderWidth: 1,
        borderColor: 'black',
    },
    titleBox: {
        position: "absolute",

        left: "5%",
        bottom: 2

    },
    insideText: {
        color: 'black',
        fontSize: 12,
        fontFamily: 'Qanelas-Bold',
    },
    pressed: {
        opacity: .7,
        backgroundColor: 'black'
    }
})
