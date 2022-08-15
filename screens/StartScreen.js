import React from 'react';
import {View, StyleSheet, Text} from "react-native";
import OutlinedButton from "../Ui/OutlinedButton";
import {useDispatch} from "react-redux";
import {authSignOutUser} from "../store/auth/authOperations";
import {Colors} from "../assets/colors/Colors";




const StartScreen = ({navigation}) => {
   const dispatch = useDispatch()


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
                <Text style={styles.title}>quickme</Text>
                <OutlinedButton icon="enter-outline" onPress={enterHandler}  >  FOLDERS   </OutlinedButton>
                <OutlinedButton icon="man-outline" onPress={profileHandler}  >   PROFILE    </OutlinedButton>
                <OutlinedButton icon="log-out-outline" onPress={signOutHandler}  >   LOGOUT   </OutlinedButton>

                <Text style={styles.version}>version 1.02</Text>

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
    title: {
        color: Colors.accent,
        position: "absolute",
        top: 100,
        fontFamily: 'Qanelas-Regular',
        fontSize: 56
    },
    version: {
        color: Colors.accent,
        position: "absolute",
        bottom: 30
    }
})
