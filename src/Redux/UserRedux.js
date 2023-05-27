import { createSlice } from "@reduxjs/toolkit"

const userSlice = createSlice({
    name: "user",
    initialState: {
        user: null,
        token: null,
        searchQuery: "",
        isFetching: false,
        error: false
    },
    reducers: {
        loginStart: (state) => {
            state.isFetching= true
        },
        loginSuccess: (state, action)=> {
            state.isFetching= false
            state.user= action.payload
            state.token= action.payload["accessToken"]
            console.log(action.payload["accessToken"])
        },
        loginFailure: (state) => {
            state.isFetching= false
            state.error= true
        },
        logOut: (state)=> {
            state.user= null
            state.token= null
        },
        changeSearchQuery: (state, action) => {
            state.searchQuery= action.payload
        },
    }
})

export const { loginStart, loginFailure, loginSuccess, logOut, changeSearchQuery } = userSlice.actions
export default userSlice.reducer