import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if(!context) {
        throw new Error("useAuth is out of scope");
    }
    return context;
}

export function AuthProvider({children}) {
    // const [isLoggedIn, setLoggedIn] = useState(false);
    const [user, isUser]=useState(null)
    const [error, setError]= useState("")
    

    const baseURL= "http://localhost:3001";

    const login = async (data) => {
        try {
            const res = await axios.post(`${baseURL}/login`, data);
            isUser(res.data);
            // console.log("res", res.data)
            setError("");
            return res.data;
        } catch (error) {
            console.log("err", error.response.data.message)
            setError(error.response.data.message)

        }
    }
    const signup = async (data) => {
        try{
            const res = await axios.post(`${baseURL}/register`, data);
            // console.log("res", res.data)
            isUser(res.data)
            setError("");
            return res.data
        }catch(error){
            console.log("err", error.response.data.message)
            setError(error.response.data.message)

        }
    }
    return(
        
        <AuthContext.Provider value={{ login, signup, user, error }}>
            {children}
        </AuthContext.Provider>

    )
}