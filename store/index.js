import {combineReducers} from "redux";
import {foldersReducer} from "./foldersReducer";
import {authSlice} from "./auth/authReducer";
const {createStore, applyMiddleware} = require("redux");
import thunk from 'redux-thunk'
import {userInfoReducer} from "./userInfoReducer";
import {contactsReducer} from "./contactsReducer";

const rootReducer = combineReducers({
    folders: foldersReducer,
    contacts: contactsReducer,
    userData: userInfoReducer,
    [authSlice.name]: authSlice.reducer
})

export const store = createStore(rootReducer, applyMiddleware(thunk))
