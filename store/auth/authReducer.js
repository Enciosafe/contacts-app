import {createSlice} from "@reduxjs/toolkit";

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        userId: null,
        nickName: null,
        stateChanged: null
    },
    reducers: {
        updateUserProfile: (state, {payload})  => ({
            ...state,
            nickName: payload.nickName,
            userId: payload.userId
        }),
        authStateChanged: (state, {payload}) => ({...state, stateChanged: payload.stateChanged, nickName: payload.nickName})
    }
})

