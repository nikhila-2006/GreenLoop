import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoute({role}) {
    if(role=="user"){
        const token = localStorage.getItem("token");
        if (!token) {
            return <Navigate to="/user/login" replace />;
        }
    }
    if(role=="recycler"){
        const token = localStorage.getItem("recyclerToken");
        if (!token) {
            return <Navigate to="/recycler/login" replace />;
        }
    }
    return <Outlet />;
}