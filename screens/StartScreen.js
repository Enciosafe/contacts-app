import React from 'react';
import {View, Text, StyleSheet, Pressable, Image} from "react-native";


const StartScreen = ({navigation}) => {

    const enterHandler = () => {
        navigation.navigate('Folders')
    }

    const img = require('../assets/img/logo.png')

    return (
        <>
            <Pressable
                style={({ pressed }) =>[styles.container, pressed && styles.pressed ]}
                onPress={enterHandler}
            >
                <View>
                    <Image source={img} resizeMode='repeat' width='30%'/>
                </View>
            </Pressable>

        </>



    );
};

export default StartScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: 'black'
    },
    text: {
        fontSize: 25,
        fontWeight: 'bold',
        color: 'yellow'
    },
    pressed: {
        opacity: 0.7,
        backgroundColor: 'tomato',
    }
})
