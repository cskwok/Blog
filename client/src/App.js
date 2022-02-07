import { useEffect, useState, useContext } from "react";
import { Outlet } from "react-router-dom";

import SideBar from "./components/SideBar.js";

import { GlobalContext } from "./contexts/GlobalContext.js";


function App() {
  const { login, setLogin, authToken, setNickName, setUserid, processing, setProcessing } = useContext(GlobalContext);

  useEffect(() => {
    async function auth() {
      setProcessing(true);
      let checkLogin = await authToken();
      console.log(checkLogin);
      if(checkLogin) {
        setLogin(true);
        let user = JSON.parse(localStorage.getItem("user"));
        setNickName(user.nickName);
        setUserid(user.userid);
      }
      setProcessing(false);
    }
    auth();
}, [login])

  return (
    <div className="App">
      <SideBar />
      <main>
        <Outlet />
      </main>
    </div>
  );
}
export default App;
