import useRedirect from "../../store/useRedirect";
import useToken from "../../store/useToken";

const LogoutButton = () => {
    const resetToken = useToken((state) => state.resetToken);
    const redirectUser = useRedirect((state) => state.redirectUser);
    const handleLogout = () => {
        resetToken();
        redirectUser();
    };

    return <span onClick={handleLogout} className="mr-3">🚪 Déconnexion</span>
}

export default LogoutButton;