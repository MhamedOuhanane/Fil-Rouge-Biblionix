import { Children } from "react";
import { Navigate } from "react-router-dom";
import useProtectedRoute from "../../hooks/useProtectedRoute";


const ProtectedRoute = ({Children, allowedRoles }) => {
    const { allowed, reason } = useProtectedRoute(allowedRoles);
    console.log(allowed, reason);
    
    if (!allowed) {
        if (reason == "unauthenticated") return <Navigate to={'/login'} />;
        if (reason == "unauthorized") return <Navigate to={'/unauthorized'} />;
    }

    return Children;
}

export default ProtectedRoute;