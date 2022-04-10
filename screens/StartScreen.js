import React from 'react';
import {View, Text, StyleSheet, Pressable} from "react-native";

const StartScreen = ({navigation}) => {

    const enterHandler = () => {
        navigation.navigate('Folders')
    }


    return (
        <View style={styles.container}>
            <Pressable
                style={({ pressed }) => [styles.button, pressed && styles.pressed ]}
                onPress={enterHandler}
            >
                <Text style={styles.text}>ENTER</Text>
            </Pressable>
        </View>

    );
};

export default StartScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'yellow'
    },
    text: {
        fontSize: 25,
        fontWeight: 'bold',
        color: 'yellow'
    },
    button: {
        backgroundColor: "blue",
        padding: 15,
        borderRadius: 15,
    },
    pressed: {
        opacity: 0.7,
        backgroundColor: 'tomato',
    }
})
