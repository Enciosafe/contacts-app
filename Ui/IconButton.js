import React from 'react';
import {Pressable, StyleSheet} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";


const IconButton = ({icon, size, color, onPress}) => {
    return (
        <Pressable
            style={({ pressed }) => [styles.button, pressed && styles.pressed ]}
            onPress={onPress}
        >
            <Ionicons
                name={icon}
                size={size}
                color={color}
            />
        </Pressable>
    );
};

export default IconButton;

const styles = StyleSheet.create({
    button: {
        padding: 3,
        justifyContent: 'center',
        alignItems: 'center'
    },
    pressed: {
        opacity: 0.5
    },
})
