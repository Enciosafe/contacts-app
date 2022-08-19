import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Image, Pressable, Alert} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import * as Linking from 'expo-linking';
import NeuMorph from "../Ui/NeuMorph";
import {Colors} from "../assets/colors/Colors";
import {PulsaringCircle} from "../components/PulsaringCircle";

const ContactDetails = ({route}) => {
    const {email, name, photo, instagram, telegram, whatsUp, facebook, phone, description, address} = route.params.props
    const [noConnections, setNoConnections] = useState(false);

    useEffect(() => {
        if(instagram === '' && telegram === '' && whatsUp === '' && facebook === '') {
            setNoConnections(true)
        }
    }, []);


    return (
        <View style={styles.container}>
            <Pressable style={styles.photoPlateContainer}>
                <NeuMorph size={305}>
                    <PulsaringCircle size={300}/>
                    <Image style={styles.image} source={{uri: photo}}/>
                </NeuMorph>
            </Pressable>
            <Text style={[styles.text, styles.name]}>{name}</Text>
            <Text style={[styles.text, styles.desc]}> {description} </Text>
            <Pressable onPress={() => {Linking.openURL(`https://www.google.com/maps/place/${address}`)}}>
                <Text style={[styles.text, styles.address]}>{address}</Text>
            </Pressable>
            <Pressable onPress={() => {Linking.openURL(`tel:${phone}`)}}>
                <Text style={[styles.text, styles.phone]}>{phone}</Text>
            </Pressable>
            <Pressable onPress={() => {Linking.openURL(`mailto:${email}`)}}>
                <Text style={[styles.text, styles.email]}>{email.toLowerCase()}</Text>
            </Pressable>


            <View style={styles.buttonContainer}>
                {instagram !== '' && <Pressable
                    style={({pressed}) => [styles.button, pressed && styles.pressed]}
                    onPress={() => {
                        Linking.openURL(instagram);
                    }}
                >
                    <View>
                        <Ionicons
                            name='logo-instagram'
                            size={40}
                            color={Colors.accent}
                        />
                    </View>
                </Pressable>
                }
                {telegram !== '' && <Pressable
                    style={({pressed}) => [styles.button, pressed && styles.pressed]}
                    onPress={() => {
                        Linking.openURL(`https://t.me/${telegram}`);
                    }}
                >
                    <View>
                        <Ionicons
                            name="paper-plane-outline"
                            size={40}
                            color={Colors.accent}
                        />
                    </View>
                </Pressable>}
                {whatsUp !== '' && <Pressable
                    style={({pressed}) => [styles.button, pressed && styles.pressed]}
                    onPress={() => {
                        Linking.openURL(`https://wa.me/${whatsUp}`);
                    }}
                >
                    <View>
                        <Ionicons
                            name="logo-whatsapp"
                            size={40}
                            color={Colors.accent}
                        />
                    </View>
                </Pressable>}
                {facebook !== '' && <Pressable
                    style={({pressed}) => [styles.button, pressed && styles.pressed]}
                    onPress={() => {
                        Linking.openURL(facebook);
                    }}
                >
                    <View>
                        <Ionicons
                            name='logo-facebook'
                            size={40}
                            color={Colors.accent}
                        />
                    </View>
                </Pressable>}
                {noConnections && <Pressable
                    style={({pressed}) => [styles.button, pressed && styles.pressed]}
                    onPress={() => {
                        Alert.alert('NO CONNECTIONS FOUND');
                    }}
                >
                    <View>
                        <Ionicons
                            name='bug-outline'
                            size={40}
                            color={Colors.accent}
                        />
                    </View>
                </Pressable>}

            </View>
        </View>
    );
};

export default ContactDetails;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: Colors.fill,
    },
    photoPlateContainer: {
        marginTop: 50,
    },
    image: {
        borderColor: 'transparent',
        borderWidth: 1,
        width:  300,
        height: 300,
        borderRadius: 150,
        backgroundColor: 'black'
    },
    text: {
        marginTop: 20,
        fontFamily: 'Qanelas-Bold',
        fontSize: 27,
        color: Colors.primal
    },
    name: {
        fontFamily: 'Qanelas-Bold',
        color: Colors.accent
    },
    desc: {
        marginTop: 0,
        fontFamily: 'Qanelas-Regular',
        fontSize: 15,
        marginHorizontal: 50,
        color: Colors.primal
    },
    phone: {
        marginTop: 5,
        fontFamily: 'Qanelas-Regular',
        fontSize: 30,
        color: Colors.accent
    },
    address: {
        borderWidth: 1,
        backgroundColor: Colors.accent,
        borderColor: Colors.accent,
        borderRadius: 10,
        paddingVertical: 5,
        paddingHorizontal: 20,
        marginTop: 45,
        fontFamily: 'Qanelas-Regular',
        fontSize: 18,
        color: Colors.primal,
        overflow: "hidden"

    },
    email: {
        marginTop: 0,
        fontFamily: 'Qanelas-Regular',
        fontSize: 18,
        color: Colors.primal,
        marginBottom: 50
    },
    buttonContainer: {
        paddingBottom: 10,
        paddingTop: 10,
        paddingHorizontal: 50,
        flexDirection: 'row',
        borderWidth: 1,
        borderBottomColor: Colors.fill,
        borderLeftColor: Colors.primal,
        borderRightColor: Colors.primal,
        borderTopColor: Colors.fill,
        borderRadius: 15,
    },
    button: {
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
