import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getRedirectUrl } from "../utils/roles";
import useToken from "../store/useToken";

export function useRedirectByRole(rolePage = null) {
    const navigate = useNavigate();
    const token = useToken((state) => state.token);
    const decodeToken = useToken((state) => state.decodeToken);
    const TokenDecode = useToken((state) => state.TokenDecode);

    useEffect(() => {
        if (token && !TokenDecode) {
          decodeToken(token);
        }
    }, [token, TokenDecode, decodeToken]);
    
    useEffect(() => {
        if(!TokenDecode) return;
        const userRole = TokenDecode.role;
        
        
        if (!userRole && (!rolePage || rolePage == "visiteur")) return;
        if (!rolePage && (!userRole || ["lecteur", "auteur"].includes(userRole))) return;

        if (userRole && ["admin", "librarian"].includes(rolePage)) {
        navigate(getRedirectUrl(userRole));
        } else if (userRole !== rolePage) {
        navigate(getRedirectUrl(userRole));
        }
    }, [TokenDecode, rolePage, navigate]);
}
