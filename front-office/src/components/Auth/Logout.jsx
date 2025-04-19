import { useRedirectByRole } from "../../hooks/useRedirectByRole";
import { LogoutIcon } from "../../Icons/Icons";
import useToken from "../../store/useToken";

const LogoutButton = () => {
    const resetToken = useToken((state) => state.resetToken);
    const handleLogout = () => {
        resetToken();
    };
    useRedirectByRole();

    return <button onClick={handleLogout} className="mr-3"> <LogoutIcon /> </button>
}

export default LogoutButton;