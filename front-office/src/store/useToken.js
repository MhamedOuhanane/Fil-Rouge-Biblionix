import { create } from "zustand";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import Swal from "sweetalert2";

const useToken = create((set) => ({
  token: Cookies.get("token") || null,
  TokenDecode: null,

  setToken: (newToken) => {
    const decodeToken = jwtDecode(newToken);
    const expirationTokenDate = new Date(decodeToken.exp * 1000);

    document.cookie = `token=${newToken}; path=/; expires=${expirationTokenDate}; SameSite=Strict`;
    set({ token: newToken, TokenDecode: decodeToken});
  },

  decodeToken: (token) => {
    try {
      const decodeToken = jwtDecode(token);
      
      set({ TokenDecode: decodeToken });
    } catch (error) {
      // Swal.fire({
      //   icon: 'error',
      //   title: 'Décodage du token',
      //   text: "Erreur de décodage du token : " + error,
      //   confirmButtonText: 'Ok',
      // });
      console.log("Erreur de décodage du token : " + error);
      
    }
  },

  resetToken: () => {
    Cookies.remove("token");
    set({ token: null, TokenDecode: null });
  },
  
}));

export default useToken;
