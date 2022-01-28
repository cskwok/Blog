import { useState, createContext } from "react";
import axios from "axios";
import Cookies from "js-cookie";

import config from "../config/config.js";

export const GlobalContext = createContext();

export function GlobalProvider({ children }) {
    const [login, setLogin] = useState(false);
    const [nickName, setNickName] = useState("");
    const [userid, setUserid] = useState(-1);

    async function authToken() {       
        const res = await axios.get(config.api("/auth"), config.axiosOptions);            
        if (res.data.status === 200 && res.data.data) {
            localStorage.setItem("user", JSON.stringify(res.data.data));
            return true;
        } else if (res.data.status === 401) {
            localStorage.setItem("user", null)
        }
        return false;
    }

    return <GlobalContext.Provider value={{
        login,
        setLogin,
        authToken,
        nickName,
        setNickName,
        userid,
        setUserid
    }}>
        {children}
    </GlobalContext.Provider>
}