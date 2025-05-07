import { create } from "zustand";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import Swal from "sweetalert2";

const useToken = create((set) => ({
  token: Cookies.get("token") || null,
  user: Cookies.get("token") ? jwtDecode(Cookies.get("token")) : null,
  badge: null,

  setToken: (newToken) => {
    const decodeToken = jwtDecode(newToken);
    const expirationTokenDate = new Date(decodeToken.exp * 1000);

    document.cookie = `token=${newToken}; path=/; expires=${expirationTokenDate}; SameSite=Strict`;
    set({ token: newToken, user: decodeToken });
  },

  decodeToken: () => {
    const token = Cookies.get("token");

    if (!token) return;

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
    if (!token) {
      set({ user: null });
      return;
    }

    try {
      const user = jwtDecode(token);
      set({ token, user });
      return user;
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Echec de decode de Token',
        text: "Erreur lors du decode de token: " + error,
        confirmButtonText: 'Ok',
        confirmButtonColor: 'red',
        color: 'red',
      });
      return null;
    }
  },

  resetToken: () => {
    Cookies.remove("token");
    set({ token: null, user: null, badge: null });
  },

  setBadge: async () => {
    const { token, user } = useToken.getState();
    if (!token || !user) {
      set({badge: null});
      return;
    }

    try {
      const response = await fetch(`/api/badge/${user?.badge_id}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      set({ badge: data.badge });
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Décodage du token',
        text: "Erreur de décodage du token : " + error,
        confirmButtonText: 'Ok',
      });
    }
  }
}));

export default useToken;