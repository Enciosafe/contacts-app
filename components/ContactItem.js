import React from 'react';
import {View, StyleSheet, Text, Image, Pressable, Alert} from "react-native";
import {useDispatch} from "react-redux";
import {removeContactAction} from "../store/contactsReducer";
import {useNavigation} from "@react-navigation/native";



const ContactItem = ({props}) => {
    const dispatch = useDispatch()
    const navigation = useNavigation()

    const onRemoveContact = (id) => {
        Alert.alert('Удаление контакта', 'Уверены что хотите удалить этот контакт?',[
            {
                text: "Нет",
                onPress: () => Alert.alert("Не удаляем"),
                style: "default",
            },
            {
                text: "Удалить",
                onPress: () => dispatch(removeContactAction(id)),
                style: "default"
            }
        ])
    }

    const contactDetailsHandler = () => {
        navigation.navigate('ContactDetails')
    }

    return (
        <Pressable
            style={({pressed}) => [styles.container, pressed && styles.pressed]}
            onPress={contactDetailsHandler}
            onLongPress={() => onRemoveContact(id)}
        >
            <View style={styles.imagePreview}>
                <Image style={styles.image} source={{uri: props.photo}}/>
                <View style={styles.textContainer}>
                    <Text style={styles.text}>{props.name}</Text>
                </View>
            </View>
        </Pressable>
    );
};

export default ContactItem;

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
    imagePreview: {
        width: 150,
        height: 150,
        marginHorizontal: 10,
        marginVertical: 8,
        backgroundColor: 'black',
        borderRadius: 100,
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


