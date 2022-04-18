import {combineReducers} from "redux";
import {foldersReducer} from "./foldersReducer";
import {contactsReducer} from "./contactsReducer";
const {createStore} = require("redux");

const rootReducer = combineReducers({
    folders: foldersReducer,
    contacts: contactsReducer
})

export const store = createStore(rootReducer)
