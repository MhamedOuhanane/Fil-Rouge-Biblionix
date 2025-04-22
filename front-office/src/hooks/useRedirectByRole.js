import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getRedirectUrl } from "../utils/roles";
import useToken from "../store/useToken";

export function useRedirectByRole(allowedPage = []) {
    const pathName = useLocation().pathname.split('/');
    const navigate = useNavigate();
    const {token, decodeToken, user} = useToken();
    
    useEffect(() => {
        if (token && !user) {
          decodeToken(token);
        }
    }, [token, user, decodeToken]);
    
    useEffect(() => {
        const userRole = user?.role ?? 'visiteur';
        
        if (!allowedPage) return navigate(getRedirectUrl(userRole));
        if (pathName[1] == userRole) return; 
        if (allowedPage.includes(userRole)) return;
        // if (!allowedPage.includes(userRole)) return navigate('/unauthorized')

    }, [user, allowedPage, navigate, pathName]);
}
