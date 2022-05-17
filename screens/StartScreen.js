import React from 'react';
import {View, StyleSheet, Text} from "react-native";
import OutlinedButton from "../Ui/OutlinedButton";
import {useDispatch} from "react-redux";
import {authSignOutUser} from "../store/auth/authOperations";
import {Colors} from "../assets/colors/Colors";



const StartScreen = ({navigation}) => {
   const dispatch =  useDispatch()

    const enterHandler = () => {
        navigation.navigate('Folders')
    }

    const profileHandler = () => {
        navigation.navigate('Profile')
    }

    const signOutHandler = () => {
       dispatch(authSignOutUser())
   }


    return (
        <View style={styles.container}>
            <OutlinedButton icon="enter-outline" onPress={enterHandler}  >[ FOLDERS ]</OutlinedButton>
            <OutlinedButton icon="man-outline" onPress={profileHandler}  > [ PROFILE ]  </OutlinedButton>
            <OutlinedButton icon="log-out-outline" onPress={signOutHandler}  > [ LOGOUT ] </OutlinedButton>

            <Text style={styles.version}>version 0.01</Text>

        </View>
    );
};

export default StartScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'black'
    },
    version: {
        color: Colors.accent,
        // justifyContent: 'center'
        position: "absolute",
        bottom: 30
    }
})
