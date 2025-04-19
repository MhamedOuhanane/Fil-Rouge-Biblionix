import { create } from "zustand";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import Swal from "sweetalert2";

const useToken = create((set) => {
  const token = Cookies.get("token") || null;
  const user = token ? jwtDecode(token) : null;

  return {
    token,
    user,

    setToken: (newToken) => {
      const decodeToken = jwtDecode(newToken);
      const expirationTokenDate = new Date(decodeToken.exp * 1000);

      document.cookie = `token=${newToken}; path=/; expires=${expirationTokenDate}; SameSite=Strict`;
      set({ token: newToken, user: decodeToken});
    },

    decodeToken: () => {
      const token = Cookies.get("token") ?? null;
      if (!token) {
        // return Swal.fire({
        //   icon: 'error',
        //   title: 'Aucun token trouvé',
        //   text: 'Il n\'y a pas de token dans les cookies.',
        //   confirmButtonText: 'Ok',
        // });
        return;
      }

      try {
        const decodeToken = jwtDecode(token);
        
        set({ user: decodeToken });
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Décodage du token',
          text: "Erreur de décodage du token : " + error,
          confirmButtonText: 'Ok',
        });
      }
    },

    getUserFromToken: () => {
      const token = Cookies.get('token');
      if (!token) return;

      try {
        const user = jwtDecode(token);
        set({ token, user });
        return user;
      } catch (error) {
        Swal.fire ({
          icon: 'error',
          title: 'Echec de decode de Token',
          text: "Erreur lour du decode de token: " + error,
          confirmButtonText: 'Ok',
          confirmButtonColor: 'red',
          color: 'red',
        });
        return null;
      }
    },

    resetToken: () => {
      Cookies.remove("token");
      set({ token: null, user: null });
    },
  };
  
});

export default useToken;
