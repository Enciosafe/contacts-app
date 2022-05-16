import React from 'react';
import {Pressable, StyleSheet} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import {Text, View} from "react-native";


const IconButton = ({icon, size, color, onPress, buttonText}) => {
    return (
        <Pressable
            style={styles.button}
            onPress={onPress}
        >
            <View style={styles.rightContainer}>
                <Ionicons
                    name={icon}
                    size={size}
                    color={color}
                />
                <Text style={styles.text}>{buttonText}</Text>
            </View>
        </Pressable>
    );
};

export default IconButton;

const styles = StyleSheet.create({
    button: {
        marginLeft: 10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        opacity: 0.7,
        borderWidth: 1,
        borderColor: 'yellow'

    },
    rightContainer: {
        opacity: .7,
        backgroundColor: 'yellow',
        padding: 5,
        height: 30,
        flexDirection: 'row',
        alignItems: 'center',
    },
    text: {
        fontFamily: 'Qanelas-Bold',
        fontSize: 11
    }
})
