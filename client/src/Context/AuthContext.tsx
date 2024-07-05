import axios from "axios";
import { createContext, useEffect, useState } from "react";


export const AuthContext = createContext()
export const AuthContextProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null)

    const login = async (data) => {
        console.log(data)
        const res = await axios.post("http://localhost:3000/auth/login", data, {

            withCredentials: true
        })
        console.log("afterrrrrrrrrr")
        const user = res.data?.user;
        if (user.Role == 1) {
            window.location.href = "/adminprofile";
        } else if (user.Role == 2) {
            window.location.href = "/";

            console.log(currentUser);
        } else {
            console.log("Invalid");
        }
    }

    useEffect(() => {
        console.log("Context");
        const refresh = async () => {
            const res = await axios.post(
                "http://localhost:3000/auth/refresh",
                {},
                {
                    withCredentials: true,
                }
            );
            console.log(res.data);
            if (!res.data.valid) return console.log("not valid token");
            console.log("twst");
            console.log("-".repeat(50));
            const userRes = await axios.get(`http://localhost:3000/user/me`, {
                withCredentials: true,
            });
            console.log("hi");

            let userData = userRes.data;
            console.log("hi");
            console.log("userdata", userData);
            setCurrentUser({ user: userData });
        };
        currentUser || refresh();
    }, []);

    const logout = async () => {
        await axios.post(
            "http://localhost:3000/auth/logout",
            {},
            {
                withCredentials: true,
            }
        );
        setCurrentUser(null);
        window.location.href = "/";
    };
    return (
        <AuthContext.Provider
            value={{ currentUser, setCurrentUser, login, logout }}
        >
            {children}
        </AuthContext.Provider>
    );
}