"use client";
import { useEffect, useRef } from "react";
import { Provider } from "react-redux";
import { setUser } from "@/store/slices/UserSlice";
import { AppStore, makeStore } from "@/store/store";
import { User } from "@/utils/user.types";

export default function StoreProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const storeRef = useRef<AppStore>(makeStore());

    useEffect(() => {
        const userJson = localStorage.getItem("user");

        if (userJson) {
            const user: User = JSON.parse(userJson);
            // console.log("UserJOSN : ", user);
            storeRef.current?.dispatch(setUser(user));
        }

    }, []);

    return <Provider store={storeRef.current}>{children}</Provider>;
}