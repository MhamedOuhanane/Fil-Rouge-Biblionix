import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import Swal from "sweetalert2";
import { getRedirectUrl } from "../utils/roles";

export function useRedirect(token) {
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
        try {
          const decoded = jwtDecode(token);
          const role = decoded?.role;
    
          if (!role) {
            navigate('/');
            return;
          }
    
          navigate(getRedirectUrl(role));
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Décodage du token',
                text: "Erreur de décodage du token : " + error,
                confirmButtonText: 'Ok',
            });
          navigate('/');
        }
    }

  }, [token, navigate]);
}
