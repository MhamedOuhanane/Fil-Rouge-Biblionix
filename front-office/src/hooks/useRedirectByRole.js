import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getRedirectUrl } from "../utils/roles";

export function useRedirectByRole(userRole = null, rolePage = null) {
  const navigate = useNavigate();

  useEffect(() => {
    if (!userRole && (!rolePage || rolePage == "visiteur")) return;
    if (!rolePage && (!userRole || ["lecteur", "auteur"].includes(userRole))) return;

    if (userRole && ["admin", "librarian"].includes(rolePage)) {
      navigate(getRedirectUrl(userRole));
    } else if (userRole !== rolePage) {
      navigate(getRedirectUrl(userRole));
    }
  }, [userRole, rolePage, navigate]);
}
