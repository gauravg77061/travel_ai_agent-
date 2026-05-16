import { createSlice } from "@reduxjs/toolkit";

const groupSlice = createSlice({

    name:"groups",

    initialState:{
        groups:[],
    },
    reducers:{
        setGroups:(state,action) =>{
        state.groups =action.payload;
    },}
});

export const{setGroups} =groupSlice.actions;

export default groupSlice.reducer;