import { createContext, useContext } from "react"


export const AppProvider = createContext()

export default function Context ({children}) {
    const [user , setUser] = useState(null)



    return (
        <AppProvider.Provider value={{
            user,
            setUser,
        }}> 
            {children} 
        </AppProvider.Provider>
    )
}

export const useGlobalContext = () => {
    return useContext(AppProvider)
} 