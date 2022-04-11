import React from 'react';
import {Pressable, StyleSheet} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import {Text, View} from "react-native";


const IconButton = ({icon, size, color, onPress}) => {
    return (
        <Pressable
            style={({ pressed }) => [styles.button, pressed && styles.pressed ]}
            onPress={onPress}
        >
            <View style={styles.rightContainer}>
                <Ionicons
                    name={icon}
                    size={size}
                    color={color}
                />
                <Text style={styles.text}>СОЗДАТЬ НОВУЮ ПАПКУ</Text>
            </View>
        </Pressable>
    );
};

export default IconButton;

const styles = StyleSheet.create({
    button: {
        marginLeft: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    pressed: {
        opacity: 1,
        backgroundColor: 'gray'
    },
    rightContainer: {
        opacity: .7,
        backgroundColor: 'lightgray',
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
