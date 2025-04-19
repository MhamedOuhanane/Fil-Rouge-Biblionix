import useToken from "../store/useToken"


const useProtectedRoute = (allowedRoles = []) => {
    const { user } = useToken();

    if (!user) return { allowed: false, reason: "unauthenticated" };
    if (allowedRoles && !allowedRoles.includes(user.role)) return { allowed: false, reason: "unauthorized"}

    return { allowed: true };
}

export default useProtectedRoute;