

const defaultState = {
    userData: []
}

const ADD_USERDATA = 'ADD_USERDATA'
const SET_USERDATA = 'SET_USERDATA'

export const userInfoReducer = (state = defaultState, action) => {
    switch (action.type) {
        case ADD_USERDATA:
            return {...state, userData: [...state.userData, action.payload]}
        case SET_USERDATA:
            return action.payload
        default:
            return state
    }
}


export const addUserInfoAction = (payload) => ({type: ADD_USERDATA, payload})
export const setUserInfoAction = (payload) => ({type: SET_USERDATA, payload})
