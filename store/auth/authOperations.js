import firebase from '../../firebase/config'
import {Alert} from "react-native";

export const authSignUpUser =  ({nickName, email, password}) => async (dispatch, getState) => {
    try{
        await firebase.auth().createUserWithEmailAndPassword(email, password)
        Alert.alert('Account was successfully created!')
    } catch (err) {
        Alert.alert(err.message)
    }
}
export const authSignInUser =  ({email, password}) => async (dispatch, getState) => {
    try{
        const user = await firebase.auth().signInWithEmailAndPassword(email, password)
        console.log('user', user)
    } catch (err) {
        Alert.alert(err.message)
    }
}
export const authSignOutUser =  () => async (dispatch, getState) => {

}


