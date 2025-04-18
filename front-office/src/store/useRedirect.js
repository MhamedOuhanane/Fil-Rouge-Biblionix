import { create } from "zustand";

const useRedirect = create(() => ({
    redirectUser: (Role) => {
        switch (Role) {
            case "admin":
                window.location.href = "/admin";                
                break;

            case "librarian":
                window.location.href = "/librarian";                
                break;
            default:
                window.location.href = "/"; 
                break;
        }
    },

    defaultPage: (UserRole = null, rolePage = null) => {
        if (!UserRole && (!rolePage || rolePage == 'visiteur')) {
            return;
        }
        if (!rolePage && (!UserRole || UserRole == "lecteur" || UserRole == 'auteur')) {
            return;
        }

        if (UserRole && (rolePage == "admin" || rolePage == "librarian")) {
            useRedirect.getState().redirectUser(UserRole);
        } else if (UserRole != rolePage) {
            useRedirect.getState().redirectUser(UserRole);
        } 
    }

}));

export default useRedirect;