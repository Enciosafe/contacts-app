import React from 'react';
import {Pressable, Text, StyleSheet} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";


const OutlinedButton = ({onPress, icon, children}) => {
    return (
        <Pressable
            onPress={onPress}
            style={({pressed}) => [styles.button, pressed && styles.pressed]}
        >
            <Ionicons
                name={icon}
                size={18}
                color='yellow'
                style={styles.icon}
            />
            <Text style={styles.text}>{children}</Text>
        </Pressable>
    );
};

export default OutlinedButton;


const styles = StyleSheet.create({
    button: {
        height: 40,
        borderRadius: 5,
        paddingHorizontal: 6,
        paddingVertical: 6,
        margin: 4,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'white',

    },
    icon: {
        marginRight: 6,
    },
    text: {
        color: 'white',
        fontFamily: 'Qanelas-Regular',
    },
    pressed: {
        opacity: 0.7,
        backgroundColor: 'yellow',
    }
})
