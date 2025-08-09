import {createSlice} from "@reduxjs/toolkit";


const modalSlice = createSlice({
    name:"modals",
    initialState:{
    show_update_profile:false
    },
    reducers:{
    
       setShowUPdateProfile:(state:any,action)=>{
          state.show_update_profile=action.payload
       }
    }
});

export const {setShowUPdateProfile} = modalSlice.actions;
export default modalSlice.reducer