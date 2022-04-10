import React from 'react';
import {View, StyleSheet, Text, Image} from "react-native";


const ContactItem = ({id, name, address, email, facebook, instagram, phone, telegram, twitter, imageUrl}) => {
    return (
        <View style={styles.container}>
            <View>
                <Image sourse={{uri: imageUrl}}/>
            </View>
            <View style={styles.box}>
                <Text style={styles.text}>{name}</Text>
            </View>
        </View>

    );
};

export default ContactItem;

const styles = StyleSheet.create({
    container: {
        paddingVertical: 10,
        margin: 8,
        flex: 1,
        alignItems: 'center',
        width: 100,
        height: 110,
        backgroundColor: 'white',
        borderRadius: 100,
    },
    box: {
        marginHorizontal: 5,
        borderWidth: 3,
        borderColor: 'black',
        borderRadius: 15,
    },

    text: {
        marginTop: 70
    }
})


