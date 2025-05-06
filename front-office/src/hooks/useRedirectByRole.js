import Cookies from 'js-cookie';
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getRedirectUrl } from "../utils/roles";
import useToken from "../store/useToken";

export function useRedirectByRole(allowedPage = []) {
    const pathName = useLocation().pathname.split('/');
    const navigate = useNavigate();
    const {user} = useToken();
    console.log(user);
    
    // const connecter = !!Cookies.get('token');
    useEffect(() => {
        const userRole = user?.role ?? 'visiteur';
        // if (!connecter && userRole !== 'visiteur') navigate('/'); 
        
        if (!allowedPage) return navigate(getRedirectUrl(userRole));
        if (allowedPage.includes('visiteur') && userRole !== 'visiteur') return navigate(getRedirectUrl(userRole));
        if (pathName[1] == userRole) return; 
        if (allowedPage.includes(userRole)) return;
        // if (!allowedPage.includes(userRole)) return navigate('/unauthorized')

    }, [user]);
}
