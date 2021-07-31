import { createContext, useState, useContext } from "react";

const AuthContext = createContext(null)

export const AuthContextProvider = ({ children })=>{
    const [user, setUser]= useState({})
    const [initialized, setInitialized] = useState(false)
    const [error, setError] = useState(null)
    const authValue = { user, setUser, initialized, setInitialized,  error, setError }


    return (
        <AuthContext.Provider value={authValue}>
        <>{children}</>
        </AuthContext.Provider>
    )
}

export const useAuthContext =()=> useContext(AuthContext)