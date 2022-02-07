import { useContext, useEffect, useState } from "react";
import { Outlet, Navigate } from "react-router-dom";

import { GlobalContext } from "../contexts/GlobalContext.js";

function Dashboard() {
    const { login, processing } = useContext(GlobalContext);
    return <div className="dashboard">
        {
            processing ? ""
                :
                <>
                    <Outlet />
                    {!login && <Navigate to="/login" />}
                </>
        }
    </div>;
}

export default Dashboard;
