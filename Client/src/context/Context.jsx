import { createContext, useContext, useState } from "react";

export const AppProvider = createContext();

export default function Context({ children }) {
    const [accessTokenn, setAccessTokenn] = useState("");
    const [refreshTokenn, setRefreshTokenn] = useState("");

    return (
        <AppProvider.Provider
            value={{
                accessTokenn,
                refreshTokenn,
                setAccessTokenn,
                setRefreshTokenn,
            }}
        >
            {children}
        </AppProvider.Provider>
    );
}

export const useGlobalContext = () => {
    return useContext(AppProvider);
};
