import React from 'react';
import {Alert, Pressable, StyleSheet, Text, View, Image} from "react-native";
import {useDispatch} from "react-redux";
import {removeFolderAction} from "../store/foldersReducer";




const FolderItem = ({id, title, image, onSelect }) => {

    const dispatch = useDispatch()



    const onRemoveFolder = (id) => {
        Alert.alert('Remove folder', 'Are u sure to delete this folder?',[
            {
                text: "NO",
                onPress: () => Alert.alert("Don't delete"),
                style: "default",
            },
            {
                text: "REMOVE",
                onPress: () => dispatch(removeFolderAction(id)),
                style: "default"
            }
        ])
    }


    return (
        <Pressable
            style={({pressed}) => [styles.container, pressed && styles.pressed]}
            onPress={onSelect}
            onLongPress={() => onRemoveFolder(id)}
        >
            <View style={styles.folderContainer}>
                <Image style={styles.image} source={{uri: image}}/>
                <View style={styles.textContainer}>
                    <Text style={styles.text}>{title}</Text>
                </View>
            </View>
        </Pressable>
    );
};


export default FolderItem;

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 15
    },
    text: {
        fontFamily: 'Qanelas-Bold',
        textAlign: 'center',
        fontSize: 16,
        color: 'white'
    },
    folderContainer: {
        width: 150,
        height: 150,
        marginHorizontal: 10,
        marginVertical: 8,
        backgroundColor: 'black',
        borderRadius: 20,
        overflow: "hidden",
    },
    textContainer: {
        backgroundColor: 'black',
        paddingBottom: 10,
        opacity: .6,
        bottom: 30,
    },
    image: {
        width: '100%',
        height: '100%'
    },
    pressed: {
        opacity: .7,
    }
})
