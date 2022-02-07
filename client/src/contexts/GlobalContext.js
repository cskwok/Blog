import { useState, createContext } from "react";
import axios from "axios";

import config from "../config/config.js";

export const GlobalContext = createContext();

export function GlobalProvider({ children }) {
    const [login, setLogin] = useState(false);
    const [nickName, setNickName] = useState("");
    const [userid, setUserid] = useState(-1);
    const [processing, setProcessing] = useState(true);

    async function authToken() {       
        const res = await axios.get(config.api("/auth"), config.axiosOptions);   

        if (res.data.status === 200 && res.data.data) {
            localStorage.setItem("user", JSON.stringify(res.data.data));
            return true;
        } else if (res.data.status === 400) {
            localStorage.setItem("user", null);
        }
        return false;
    }

    async function handleLogin(userName, password) {
        let res = await axios.post(config.api("/auth"), {
            userName: userName,
            password: password
        }, config.axiosOptions);
        
        if (res.data.status === 200 && res.data.data) {          
            let checkLogin = await authToken();
            if (checkLogin) {                
                setLogin(true);
            }
        } else if(res.data.status === 401) {            
            return res.data.msg;
        }
    }

    async function handleLogOut() {
        let res = await axios.delete(config.api("/auth"), config.axiosOptions);        
        if (res.data.status === 200) {          
            setLogin(false);
        }
    }

    return <GlobalContext.Provider value={{
        login,
        setLogin,
        authToken,
        handleLogin,
        handleLogOut,
        nickName,
        setNickName,
        userid,
        setUserid,
        processing,
        setProcessing
    }}>
        {children}
    </GlobalContext.Provider>
}