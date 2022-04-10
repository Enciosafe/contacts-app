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
                color='black'
                style={styles.icon}
            />
            <Text style={styles.text}>{children}</Text>
        </Pressable>
    );
};

export default OutlinedButton;


const styles = StyleSheet.create({
    button: {
        paddingHorizontal: 12,
        paddingVertical: 6,
        margin: 4,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'black',

    },
    pressed: {
        opacity: 0.7,
        backgroundColor: 'yellow'
    },
    icon: {
        marginRight: 6,
    },
    text: {
        color: 'black'
    }
})
