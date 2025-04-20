import { Navigate } from "react-router-dom";
import useProtectedRoute from "../../hooks/useProtectedRoute";


const ProtectedRoute = ({ children, allowedRoles }) => {
    const { allowed, reason } = useProtectedRoute(allowedRoles);
    
    if (!allowed) {
        if (reason == "unauthenticated") return <Navigate to={'/login'} />;
        if (reason == "unauthorized") return <Navigate to={'/unauthorized'} />;
    }

    return children;
}

export default ProtectedRoute;