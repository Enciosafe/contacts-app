import React from 'react';
import {View, StyleSheet, Text, Image, Pressable, Alert} from "react-native";
import {useDispatch} from "react-redux";
import {removeContactAction} from "../store/contactsReducer";
import {useNavigation} from "@react-navigation/native";
import {deleteContactFromStore} from "../util/http";
import {Colors} from "../assets/colors/Colors";




const ContactItem = ({props}) => {
    const dispatch = useDispatch()
    const navigation = useNavigation()

    const onRemoveContactAction = async (id) => {
        await deleteContactFromStore(id)
        dispatch(removeContactAction(id))
    }

    const onRemoveContact = (id) => {
        Alert.alert('delete', 'Are u sure to remove this contact?',[
            {
                text: "NO",
                onPress: () => Alert.alert("Don't delete"),
                style: "default",
            },
            {
                text: "REMOVE",
                onPress: () => onRemoveContactAction(id),
                style: "default"
            }
        ])
    }

    const contactDetailsHandler = () => {
        navigation.navigate('ContactDetails', {
            props: props
        })
    }

    return (
        <Pressable
            style={({pressed}) => [styles.container, pressed && styles.pressed]}
            onPress={contactDetailsHandler}
            onLongPress={() => onRemoveContact(props.id)}
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
        marginVertical: 20,
        marginHorizontal: 15,
        borderWidth: 1,
        borderRadius: 100,
        borderColor: Colors.accent
    },
    text: {
        fontFamily: 'Qanelas-Bold',
        textAlign: 'center',
        fontSize: 10,
        color: Colors.accent
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
        backgroundColor: Colors.accent
    }
})


