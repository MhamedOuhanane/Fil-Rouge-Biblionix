import { LogoutIcon } from "../../Icons/Icons";
import useToken from "../../store/useToken";
import { useRedirectByRole } from '../../hooks/useRedirectByRole';

const LogoutButton = ({ isOpen = false, dashboard = false}) => {
    const { resetToken, setBadge } = useToken();
    
    const handleLogout = () => {
        resetToken();
        setBadge();
    };
    useRedirectByRole();

    return (
        <button
            // to={'/logout'}
            onClick={handleLogout}
            className={`w-full flex items-center text-sm rounded ${!dashboard ? "text-[#6B4423]" : "text-amber-200 hover:bg-amber-800 hover:text-white  gap-3 px-4 py-3"}`}
        >
            <LogoutIcon />
            {isOpen && <span>Déconnecter</span>}
        </button>
    )
    //   <button onClick={handleLogout} className="mr-3"> <LogoutIcon /> {isOpen && <span>Déconnecter</span>} </button>
}

export default LogoutButton;