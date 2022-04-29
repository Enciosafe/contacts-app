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
export const authSignInUser =  () => async (dispatch, getState) => {

}
export const authSignOutUser =  () => async (dispatch, getState) => {

}


