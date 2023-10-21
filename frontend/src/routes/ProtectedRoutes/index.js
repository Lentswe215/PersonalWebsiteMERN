import { Navigate, Outlet } from "react-router-dom"

const ProtectedRoute = ({ isPublic, isAuthorized }) => {
    console.log(isPublic);
    return (isPublic || isAuthorized) ? <Outlet /> : <Navigate to="/login" />;
}

export default ProtectedRoute;