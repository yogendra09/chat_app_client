import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  errors: [],
  activeUsers:[],
  groups:[],
  isConnected:false,
  isAuthenticated: false,
};

export const userReducer = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUser: (state, action) => {
      (state.user = action.payload), (state.isAuthenticated = true);
    },
    removeUser: (state, action) => {
      (state.user = null), (state.isAuthenticated = false);
    },
    activeUsers:(state,action)=>{
       state.activeUsers = action.payload;
    },
    Addgroup:(state,action)=>{
      state.groups.push(action.payload);
   },
   setGroup:(state,action)=>{
    state.groups = action.payload;
 },
    isError: (state, action) => {
      state.errors.push(action.payload);
    },
    updateConnection:(state,action)=>{
         state.isConnected = action.payload
    },
    removeError: (state, action) => {
      state.errors = [];
    },
  },
});

// Action creators are generated for each case reducer function
export const {addUser,isError,removeError,removeUser,updateConnection,activeUsers,Addgroup,setGroup} = userReducer.actions;

export default userReducer.reducer;
