import { configureStore } from '@reduxjs/toolkit';
// import { authReducer, userReducer } from './reducers';
import authSlice from './reducers';

const store = configureStore({
    reducer : {
        time : authSlice
    }
})

export default store