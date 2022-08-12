import {ADD_FOLDER, REMOVE_FOLDER, SET_FOLDER, UPDATE_FOLDER} from "./types/folder.types";

const defaultState = {
    folders: []
}



export const foldersReducer = (state = defaultState, action) => {
    switch (action.type) {
        case ADD_FOLDER:
            return {...state, folders: [...state.folders, action.payload]}
        case UPDATE_FOLDER:
            return {...state, folders: [...state.folders, action.payload]}
        case REMOVE_FOLDER:
            return {...state, folders: state.folders.filter(folder => folder.id !== action.payload) }
        case SET_FOLDER:
            return action.payload
        default:
            return state
    }
}

export const addFolderAction = (payload) => ({type: ADD_FOLDER, payload})
export const updateFolderAction = (payload) => ({type: UPDATE_FOLDER, payload})
export const setFolderAction = (payload) => ({type: SET_FOLDER, payload})
export const removeFolderAction = (payload) => ({type: REMOVE_FOLDER, payload})
