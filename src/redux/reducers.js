
// const initialState1 = {
//     isAuthenticated: false,
//     token: null,
//   };
  
//   const authReducer = (state = initialState1, action) => {
//     switch (action.type) {
//       case 'LOGIN_SUCCESS':
//         return {
//           ...state,
//           isAuthenticated: true,
//           token: action.payload,
//         };
//       case 'LOGOUT':
//         return {
//           ...state,
//           isAuthenticated: false,
//           token: null,
//         };
//       default:
//         return state;
//     }
//   };
  
//   const initialState2 = {
//     userData: null,
//   };
  
//   const userReducer = (state = initialState2, action) => {
//     switch (action.type) {
//       case 'SET_USER':
//         return {
//           ...state,
//           userData: action.payload,
//         };
//       default:
//         return state;
//     }
//   };
  

// export {userReducer, authReducer}

import { createSlice } from "@reduxjs/toolkit";

const date = "Time not available"
const initialState = date

export const authSlice = createSlice({
    name : "authSlice",
    initialState,
    reducers : {
        addTime : (state, action) =>{
            return action.payload
        }
    }
})

export const { addTime } = authSlice.actions;
export default authSlice.reducer