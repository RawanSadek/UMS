import { jwtDecode } from "jwt-decode";
import { createContext, useEffect, useState, type ReactNode } from "react";

interface User{
    id: number;
    image: string;
    firstName: string;
    lastName: string;    email: string;
    phone: string;
    birthDate: string;
    age:number
}

interface AuthContextInterface{
    userData:User | null
    saveUserData:()=>void
}
export const AuthContext = createContext<AuthContextInterface|null>(null);

interface AuthContextproviderProps {
    children: ReactNode
}

export default function AuthContextProvider({ children }: AuthContextproviderProps) {
    let [userData, setUserData] = useState<User|null>(null);
    let saveUserData = () => {
        const encodedData = localStorage.getItem("accessToken");
        if (encodedData) {
            const decodedData = jwtDecode<User>(encodedData);
            setUserData(decodedData)
        }
    }

    useEffect(()=>{
        if(localStorage.getItem("accessToken"))
        {
            saveUserData()
        }
    },[])

    return(
        <AuthContext.Provider value={{userData, saveUserData}}>{children}</AuthContext.Provider>
    )
}