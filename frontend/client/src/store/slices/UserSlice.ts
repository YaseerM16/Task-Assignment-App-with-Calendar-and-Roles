"use client";
import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { userState } from "@/utils/user.types";


const initialState: userState = {
    user: null
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<userState['user']>) => {
            state.user = action.payload
        },
        logout: (state) => {
            state.user = null;
        },
    },
});

export const { setUser, logout } = userSlice.actions;

export default userSlice.reducer;