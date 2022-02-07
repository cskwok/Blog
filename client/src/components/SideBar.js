import { useEffect, useState, useContext } from "react";
import { Link, useLocation } from "react-router-dom";

import { GlobalContext } from "../contexts/GlobalContext.js";


function useRefs() {
    const refs = [];
    return [refs, e => e && refs.push(e)];
}

function SideBar() {
    const selectedClass = "selected";
    const itemPaths = [
        "/",
        "/dashboard"
    ]

    const [isDashboard, setIsDashboard] = useState(false);
    const [selected, setSelected] = useState(-1);
    const [selectedStatus, setSelectedStatus] = useState([false, false]);
    const location = useLocation();

    const { login, nickName, handleLogOut } = useContext(GlobalContext);

    useEffect(() => {
        const pathName = location.pathname;
        if (pathName.search("dashboard") >= 0) {
            setIsDashboard(true);
        } else {
            setIsDashboard(false);
        }
    }, [location]);

    useEffect(() => {
        let index = itemPaths.findIndex((i) => (i === location.pathname));
        if (index === selected) return;
        console.log(location);
        if (selected >= 0) {
            setSelectedStatus(status => (
                status.map((s) => {
                    return false;
                })
            ));
        }
        setSelected(index);
    }, [location]);

    useEffect(() => {
        if (selected >= 0) {
            setSelectedStatus(status => (
                status.map((s, i) => {
                    if (i === selected) {
                        return true;
                    } else {
                        return false;
                    }
                })
            ));
        }
    }, [selected]);

    return (
        <div className="sidebar">
            {
                isDashboard ?
                    <>
                        <Link to="/dashboard"><h1 className="logo">Dashboard</h1></Link>
                        <ul className="sidemenu">
                            <Link to="/dashboard"><li className={"menu-item " + (selectedStatus[1] ? selectedClass : "")}>Home</li></Link>
                        </ul>
                    </>
                    :
                    <>
                        <Link to="/"><h1 className="logo">Blog</h1></Link>
                        <ul className="sidemenu">
                            <Link to="/"><li className={"menu-item " + (selectedStatus[0] ? selectedClass : "")}>All Posts</li></Link>
                        </ul>
                    </>
            }

            <div className="sideBottom">
                {
                    login &&
                    <div className="info">
                        <p className="greeting">Hi, {nickName}! <span onClick={handleLogOut}>( LogOut )</span></p>
                    </div>
                }
                {
                    isDashboard? 
                    <>
                    <Link to="/"><div className="btn">Blog</div></Link>
                    </>
                    :
                    <>
                    <Link to={login ? "/dashboard" : "/login"}><div className="btn">{login ? "Dashboard" : "Login"}</div></Link>
                    </>
                }               
            </div>
        </div>
    );
}

export default SideBar;
