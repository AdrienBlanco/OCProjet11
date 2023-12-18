import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
    name: "auth",
    initialState: { 
        token: null
    },
    reducers: {
        setLogIn: (state, action) => {
            state.token = action.payload.token
        },
        setLogOut: (state) => {
            state.token = null;
        },
    },
});

export const { setLogIn, setLogOut } = authSlice.actions;
export default authSlice.reducer;