import { Children } from "react";
import useProtectedRoute from "../../hooks/useProtectedRoute";
import { Navigate } from "react-router-dom";


const ProtectedRoute = ({Children, allowedRoles }) => {
    const { allowed, reason } = useProtectedRoute(allowedRoles);

    if (!allowed) {
        if (reason == "unauthenticated") return <Navigate to={'/login'} />;
        if (reason == "unauthorized") return <Navigate to={'/unauthorized'} />;
    }

    return Children;
}

export default ProtectedRoute;