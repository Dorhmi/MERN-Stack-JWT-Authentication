import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

export const AppProvider = createContext();

export default function Context({ children }) {
    const [accessTokenn, setAccessTokenn] = useState("");
    const [refreshTokenn, setRefreshTokenn] = useState("");

    useEffect(() => {
        setAccessTokenn(localStorage.getItem("accessToken"));
        setRefreshTokenn(localStorage.getItem("refreshToken"));
    }, []);

    const refreshToken = async () => {
        try {
            const res = await axios.post("http://localhost:3001/auth/refresh", {
                token: refreshTokenn,
            });
            localStorage.clear();
            localStorage.setItem("accessToken", res.data.accessToken);
            localStorage.setItem("refreshToken", res.data.refreshToken);
            // setUser({
            //     ...user,
            //     accessToken: res.data.accessToken,
            //     refreshToken: res.data.refreshToken
            // });
            return res.data;
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <AppProvider.Provider
            value={{
                accessTokenn,
                refreshTokenn,
                setAccessTokenn,
                setRefreshTokenn,
                refreshToken,
            }}
        >
            {children}
        </AppProvider.Provider>
    );
}

export const useGlobalContext = () => {
    return useContext(AppProvider);
};
