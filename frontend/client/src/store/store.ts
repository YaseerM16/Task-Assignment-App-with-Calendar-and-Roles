import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/UserSlice"

export const makeStore = () => {
    return configureStore({
        reducer: {
            users: userReducer,
        },
    });
};
export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];