import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getRedirectUrl } from "../utils/roles";
import useToken from "../store/useToken";

export function useRedirectByRole(rolePage = null) {
    const navigate = useNavigate();
    const {token, decodeToken, user} = useToken();

    useEffect(() => {
        if (token && !user) {
          decodeToken(token);
        }
    }, [token, user, decodeToken]);
    
    useEffect(() => {
        if(!user) return;
        const userRole = user.role;
        
        
        if (!userRole && (!rolePage || rolePage == "visiteur")) return;
        if (!rolePage && (!userRole || ["lecteur", "auteur"].includes(userRole))) return;

        if (userRole && ["admin", "librarian"].includes(rolePage)) {
        navigate(getRedirectUrl(userRole));
        } else if (userRole !== rolePage) {
        navigate(getRedirectUrl(userRole));
        }
    }, [user, rolePage, navigate]);
}
