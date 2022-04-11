import {combineReducers} from "redux";
import {foldersReducer} from "./foldersReducer";
const {createStore} = require("redux");

const rootReducer = combineReducers({
    folders: foldersReducer
})

export const store = createStore(rootReducer)
