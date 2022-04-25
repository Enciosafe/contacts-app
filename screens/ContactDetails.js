import React from 'react';
import {View, Text, StyleSheet, Image, Pressable} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import * as Linking from 'expo-linking';
import NeuMorph from "../Ui/NeuMorph";

const ContactDetails = ({route}) => {
    const {email, name, photo, instagram, telegram, whatsUp, phone, description} = route.params.props


    return (
        <View style={styles.container}>
            <Pressable style={styles.photoPlateContainer}>
                <NeuMorph size={300}>
                    <Image style={styles.image} source={{uri: photo}}/>
                </NeuMorph>
            </Pressable>
            <Text style={[styles.text]}>{name}</Text>
            <Text style={[styles.text, styles.desc]}> {description} </Text>
            <Pressable onPress={() => {Linking.openURL(`tel:${phone}`)}}>
                <Text style={[styles.text, styles.phone]}>{phone}</Text>
            </Pressable>
            <Pressable onPress={() => {Linking.openURL(`mailto:${email}`)}}>
                <Text style={[styles.text, styles.email]}>{email.toLowerCase()}</Text>
            </Pressable>


            <View style={styles.buttonContainer}>
                <Pressable
                    style={({ pressed }) => [styles.button, pressed && styles.pressed ]}
                    onPress={() => {Linking.openURL(instagram);}}
                >
                    <NeuMorph size={60}>
                        <Ionicons
                            name='logo-instagram'
                            size={40}
                            color='#58585DFF'
                        />
                    </NeuMorph>
                </Pressable>
                <Pressable
                    style={({ pressed }) => [styles.button, pressed && styles.pressed ]}
                    onPress={() => {Linking.openURL(`https://t.me/${telegram}`);}}
                >
                    <NeuMorph size={60}>
                        <Ionicons
                            name="paper-plane-outline"
                            size={40}
                            color='#58585DFF'
                        />
                    </NeuMorph>
                </Pressable>
                <Pressable
                    style={({ pressed }) => [styles.button, pressed && styles.pressed ]}
                    onPress={() => {Linking.openURL(`https://wa.me/${whatsUp}`);}}
                >
                    <NeuMorph size={60}>
                        <Ionicons
                            name="logo-whatsapp"
                            size={40}
                            color='#58585DFF'
                        />
                    </NeuMorph>
                </Pressable>
            </View>
        </View>
    );
};

export default ContactDetails;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: "#ebecef",
    },
    photoPlateContainer: {
        marginTop: 50,
    },
    image: {
        borderColor: '#e2e2e7',
        borderWidth: 10,
        width:  300,
        height: 300,
        borderRadius: 150,
        backgroundColor: 'black'
    },
    text: {
        marginTop: 20,
        fontFamily: 'Qanelas-Bold',
        fontSize: 27
    },
    desc: {
        marginTop: 0,
        fontFamily: 'Qanelas-Regular',
        fontSize: 15,
        marginHorizontal: 50,
    },
    phone: {
        marginTop: 50,
        fontFamily: 'Qanelas-Regular',
        fontSize: 30
    },
    email: {
        marginTop: 0,
        fontFamily: 'Qanelas-Regular',
        fontSize: 18
    },
    buttonContainer: {
        flexDirection: 'row'
    },
    button: {
        marginTop: 100,
        marginHorizontal: 5,
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
