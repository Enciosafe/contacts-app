import {createSlice} from "@reduxjs/toolkit";

const state = {
    userId: null,
    nickName: null,
    stateChanged: false
}

const actions = {
    updateUserProfile: (state, {payload})  => ({
        ...state,
        nickName: payload.nickName,
        userId: payload.userId
    }),
    authStateChanged: (state, {payload}) => ({
        ...state,
        stateChanged: payload.stateChanged,
    }),
    authSignOut: () => state
}

export const authSlice = createSlice({
    name: 'auth',
    initialState: state,
    reducers: actions
})

