import React from 'react';
import {Alert, Pressable, StyleSheet, Text, View, Image} from "react-native";
import {useNavigation} from "@react-navigation/native";
import {useDispatch} from "react-redux";
import {removeFolderAction} from "../store/foldersReducer";




const FolderItem = ({id, title, onSelect }) => {

    const image1 = require('../assets/img/switz.png')
    const image2 = require('../assets/img/ukraine.png')
    const dispatch = useDispatch()


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


    return (
        <Pressable
            style={({pressed}) => [styles.box, pressed && styles.pressed]}
            onPress={onSelect}
            onLongPress={() => onRemoveFolder(id)}
        >
            <Image style={styles.img} source={image1}/>
            <View style={styles.titleBox}>
                <Text style={styles.insideText}>{title.toUpperCase()}</Text>
            </View>
        </Pressable>
    );
};


export default FolderItem;

const styles = StyleSheet.create({
    box: {
        marginHorizontal: 10,
        marginTop: 15,
        width: 110,
        height: 100,
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: 'black',
    },
    titleBox: {
        marginBottom: 20,
        backgroundColor: 'black',
        borderWidth: 2

    },
    img: {
        maxWidth: 108,
        maxHeight: 80
    },
    insideText: {
        color: 'white',
        fontSize: 12,
        fontFamily: 'Qanelas-Bold',
    },
    pressed: {
        opacity: .7,
        backgroundColor: 'black'
    }
})
