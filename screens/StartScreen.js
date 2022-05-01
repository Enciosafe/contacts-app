import React from 'react';
import {View, StyleSheet} from "react-native";
import OutlinedButton from "../Ui/OutlinedButton";
import {useDispatch} from "react-redux";
import {authSignOutUser} from "../store/auth/authOperations";
import db from '../firebase/config'



const StartScreen = ({navigation}) => {
   const dispatch =  useDispatch()

    const enterHandler = () => {
        navigation.navigate('Folders')
    }

    const profileHandler = () => {
        navigation.navigate('Profile')
    }

    const signOutHandler = () => {
       // await db.auth().signOut()
       //  navigation.navigate('Login')

        dispatch(authSignOutUser())
   }


    return (
        <View style={styles.container}>
            <OutlinedButton icon="enter-outline" onPress={enterHandler}  >   ENTER   </OutlinedButton>
            <OutlinedButton icon="man-outline" onPress={profileHandler}  > PROFILE  </OutlinedButton>
            <OutlinedButton icon="log-out-outline" onPress={signOutHandler}  >SIGN OUT</OutlinedButton>

        </View>



    );
};

export default StartScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    image: {
        flex: 1,
        // justifyContent: 'center'
        width: '100%'
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
