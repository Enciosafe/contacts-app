import { ADD_CONTACT, SET_CONTACT, REMOVE_CONTACT, UPDATE_CONTACT } from "./types/contact.types";


const defaultState = {
    contacts: []
}



export const contactsReducer = (state = defaultState, action) => {
    switch (action.type) {
        case ADD_CONTACT:
            return {...state, contacts: [...state.contacts, action.payload]}
        case UPDATE_CONTACT:
            return {...state, contacts: [...state.contacts, action.payload]}
        case REMOVE_CONTACT:
            return {...state, contacts: state.contacts.filter(contact => contact.id !== action.payload)}
        case SET_CONTACT:
            return action.payload
        default:
            return state
    }
}

export const addContactAction = (payload) => ({type: ADD_CONTACT, payload})
export const setContactAction = (payload) => ({type: SET_CONTACT, payload})
export const removeContactAction = (payload) => ({type: REMOVE_CONTACT, payload})
export const updateContactAction = (payload) => ({type: UPDATE_CONTACT, payload})
