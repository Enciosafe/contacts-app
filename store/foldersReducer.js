const defaultState = {
    folders: []
}

const ADD_FOLDER = "ADD_FOLDER"
const REMOVE_FOLDER = "REMOVE_FOLDER"

export const foldersReducer = (state = defaultState, action) => {
    switch (action.type) {
        case ADD_FOLDER:
            return {...state, folders: [...state.folders, action.payload]}
        case REMOVE_FOLDER:
            return {...state, folders: state.folders.filter(folder => folder.id !== action.payload) }
        default:
            return state
    }
}

export const addFolderAction = (payload) => ({type: ADD_FOLDER, payload})
export const removeFolderAction = (payload) => ({type: REMOVE_FOLDER, payload})