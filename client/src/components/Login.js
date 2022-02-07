import { useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";

import config from "../config/config.js";

import { GlobalContext } from "../contexts/GlobalContext.js";

function Login() {
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const { login, handleLogin } = useContext(GlobalContext);

    async function handleSubmit(e) {
        e.preventDefault();
        const res = await handleLogin(userName, password);
        if (res) {
            setUserName("");
            setPassword("");
            console.log(res);
        }
    }

    return (
        <div className="login card">
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="userName">User Name:</label><input type="text" id="userName" name="userName" onChange={(e) => { setUserName(e.target.value) }} value={userName} />
                <label htmlFor="password">Password:</label><input type="password" id="password" name="password" onChange={(e) => { setPassword(e.target.value) }} value={password} />
                <input className="btn" type="submit" value="Login" />
            </form>
            {login && <Navigate to="/" />}
        </div>
    );
}

export default Login;
