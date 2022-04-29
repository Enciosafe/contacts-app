import {combineReducers} from "redux";
import {foldersReducer} from "./foldersReducer";
import {contactsReducer} from "./contactsReducer";
import {authSlice} from "./authReducer";
const {createStore} = require("redux");

const rootReducer = combineReducers({
    folders: foldersReducer,
    contacts: contactsReducer,
    [authSlice.name]: authSlice.reducer
})

export const store = createStore(rootReducer)
