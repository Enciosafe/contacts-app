import React from 'react';
import {View, StyleSheet, Text, Image} from "react-native";



const ContactItem = ({id, name, email, photo}) => {
    console.log(photo)


    // const picture = require(photo)

    return (
        <View style={styles.container}>
            <View style={styles.imagePreview}>
                <Image style={styles.image} source={{uri: photo}}/>
                <View style={styles.textContainer}>
                    <Text style={styles.text}>{name}</Text>
                </View>
            </View>
        </View>
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
    }
})


