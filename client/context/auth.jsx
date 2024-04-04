import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    console.log("context:", context)
    if(!context) {
        throw new Error("useAuth must be used within AuthProvider");
    }
    return context;
}

export function AuthProvider({children}) {

    const baseURL= "http://localhost:3001";

    const login = async(data) => {
        try{
            const res = await axios.post(`${baseURL}/login`, data);
            console.log("res", res.data)
            return res.data;

        }catch(error){
            console.log(error)
            throw error;
        }
    }

    return(
        <AuthContext.Provider value={{ login }}>
            {children}
        </AuthContext.Provider>
    )
}