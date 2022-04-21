import React from 'react';
import {View, Text, StyleSheet, Image, Pressable} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import * as Linking from 'expo-linking';

const ContactDetails = ({route}) => {
    const {email, name, photo, instagram} = route.params.props


    return (
        <View style={styles.container}>
            <View>
                <Image style={styles.image} source={{uri: photo}}/>
            </View>
            <Text style={[styles.text]}>{name}</Text>
            <Pressable onPress={() => {Linking.openURL(`mailto:${email}`)}}>
                <Text style={[styles.text, styles.email]}>{email.toLowerCase()}</Text>
            </Pressable>

            <Pressable
                style={({ pressed }) => [styles.button, pressed && styles.pressed ]}
                onPress={() => {Linking.openURL(instagram);}}
            >
                <View>
                    <Ionicons
                        name='logo-instagram'
                        size={40}
                        color='black'
                    />
                </View>
            </Pressable>

        </View>
    );
};

export default ContactDetails;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        margin: 20,
        marginTop: 50,
    },
    image: {
        borderColor: 'gray',
        borderWidth: 1,
        width:  250,
        height: 250,
        borderRadius: 200,
        backgroundColor: 'black'
    },
    text: {
        marginTop: 10,
        fontFamily: 'Qanelas-Bold',
        fontSize: 22
    },
    email: {
        marginTop: 0,
        fontFamily: 'Qanelas-Regular',
        fontSize: 18
    },
    button: {
        marginTop: 200,
        justifyContent: 'center',
        alignItems: 'center'
    },
    icon: {
       borderWidth: 1,
        height: 100
    },
    pressed: {
        opacity: .6,
    },
})
