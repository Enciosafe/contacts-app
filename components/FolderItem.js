import React from 'react';
import {Alert, Pressable, StyleSheet, Text, View, Image} from "react-native";
import {useDispatch} from "react-redux";
import {removeFolderAction} from "../store/foldersReducer";
import {deleteFolderFromStore, updateFolderFromStore} from "../util/http";
import {Colors} from "../assets/colors/Colors";
import {useNavigation} from "@react-navigation/native";




const FolderItem = ({id, title, image, onSelect }) => {
    const navigation = useNavigation()
    const dispatch = useDispatch()

    const onRemoveFolderAction = async (id) => {
        await deleteFolderFromStore(id)
        dispatch(removeFolderAction(id))
    }


    const onChangeFolderAction = async (id) => {
       navigation.navigate('NewFolder', {
           folderId: id,
           folderTitle: title,
           folderImage: image
       })
    }


    const onChangeFolder = (id) => {
        Alert.alert('Change folder', 'How are u want to change this folder?',[
            {
                text: "Nothing",
                onPress: () => Alert.alert("OKAY"),
                style: "cancel",
            },
            {
                text: "Change name or/and pic",
                onPress: () => onChangeFolderAction(id),
                style: "default"
            },
            {
                text: "Remove",
                onPress: () => onRemoveFolderAction(id),
                style: "destructive"
            }
        ])
    }


    return (
        <Pressable
            style={({pressed}) => [styles.container, pressed && styles.pressed]}
            onPress={onSelect}
            onLongPress={() => onChangeFolder(id)}
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
        color: Colors.accent
    },
    folderContainer: {
        width: 150,
        height: 150,
        marginHorizontal: 10,
        marginVertical: 8,
        backgroundColor: Colors.primal,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: Colors.accent,
        overflow: "hidden",
    },
    textContainer: {
        backgroundColor: Colors.fill,
        paddingBottom: 10,
        opacity: .8,
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
