import React from 'react';
import {Alert, Pressable, StyleSheet, Text, View, Image} from "react-native";
import {useDispatch} from "react-redux";
import {removeFolderAction} from "../store/foldersReducer";
import {deleteFolderFromStore} from "../util/http";
import {Colors} from "../assets/colors/Colors";
import {useNavigation} from "@react-navigation/native";
import * as Haptics from "expo-haptics";




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
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error).catch(e => console.log(e))
        Alert.alert('Change folder', 'How are u want to change this folder?',[
            {
                text: "Nothing",
                onPress: () => {},
                style: "cancel",
            },
            {
                text: "Update",
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
        marginHorizontal: 5,
        marginTop: 20
    },
    text: {
        fontFamily: 'Qanelas-Bold',
        textAlign: 'center',
        fontSize: 11,
        color: Colors.accent
    },
    folderContainer: {
        width: 120,
        height: 120,
        marginVertical: 5,
        backgroundColor: Colors.primal,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: Colors.accent,
        overflow: "hidden",
    },
    textContainer: {
        backgroundColor: Colors.fill,
        paddingBottom: 15,
        opacity: .8,
        bottom: 26,
    },
    image: {
        width: '100%',
        height: '100%'
    },
    pressed: {
        opacity: .7,
        borderColor: Colors.primal
    }
})
