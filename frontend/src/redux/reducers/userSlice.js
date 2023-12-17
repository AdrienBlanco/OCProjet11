import { createSlice } from "@reduxjs/toolkit"

const userSlice = createSlice({
    name: "user",
    initialState: {
        email: "",
        firstName: "",
        lastName: "",
        userName: "",
    },
    reducers: {
        setGetUser: (state, action) => {
            const userProfile = action.payload.userProfile.body;
            state.email = userProfile.email;
            state.firstName = userProfile.firstName;
            state.lastName = userProfile.lastName;
            state.userName = userProfile.userName;
        },
        setEditUserName: (state, action) => {
            state.userName = action.payload;
        },
    },
})

export const { setGetUser, setEditUserName } = userSlice.actions
export default userSlice.reducer