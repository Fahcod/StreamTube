import {createSlice} from "@reduxjs/toolkit";


const usersSlice = createSlice({
    name:"users",
    initialState:{
    all_users:[]
    },
    reducers:{
    setUsers:(state:any,action)=>{
    state.all_users = action.payload
    }
    }
});

export const {setUsers} = usersSlice.actions;
export default usersSlice.reducer