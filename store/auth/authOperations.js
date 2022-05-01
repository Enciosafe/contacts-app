import db from '../../firebase/config'
import {Alert} from "react-native";
import {authSlice} from "./authReducer"

const {authSignOut, updateUserProfile, authStateChanged} = authSlice.actions

export const authSignUpUser =  ({nickName, email, password}) => async (dispatch, getState) => {
    try{
        await db.auth().createUserWithEmailAndPassword(email, password)
        const user = await db.auth().currentUser
        await user.updateProfile({
            displayName: nickName
        })

        const {uid, displayName} = await db.auth().currentUser

        dispatch(authSlice.actions.updateUserProfile({
            nickName: displayName,
            userId: uid
        }))
        Alert.alert('Account was successfully created!')
    } catch (err) {
        Alert.alert(err.message)
    }
}
export const authSignInUser =  ({email, password}) => async (dispatch, getState) => {
    try{
        await db.auth().signInWithEmailAndPassword(email, password)
    } catch (err) {
        Alert.alert(err.message)
    }
}

export const authStateChangeUser = () => async (dispatch, getState) => {
    await db.auth().onAuthStateChanged((user) => {
        if(user) {
            dispatch(updateUserProfile({
                nickName: user.displayName,
                userId: user.uid
            }))
            dispatch(authStateChanged({stateChanged: true}))
        }
    } )
}

export const authSignOutUser =  () => async (dispatch, getState) => {
    await db.auth().signOut()
    dispatch(authSignOut())
}


