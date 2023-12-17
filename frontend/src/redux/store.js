import { configureStore } from "@reduxjs/toolkit"
import authSlice from './reducers/authSlice';
import userSlice from './reducers/userSlice';

const store = configureStore({
    reducer: {
        auth: authSlice,
        user: userSlice
    },
})

export default store