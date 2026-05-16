import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./slices/authSlice"

import groupReducer from "./slices/groupSlice"

const store=configureStore({
    reducer:{
        auth:authReducer,

        groups:groupReducer,
    }
})

export default store;
