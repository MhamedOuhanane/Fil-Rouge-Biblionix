import { Link } from "react-router-dom";
import useToken from "../../store/useToken";
import { getRedirectUrl } from "../../utils/roles";

const NotFound = () => {
    const { user } = useToken();
    const role = user?.role ?? null;
    console.log(user);
    
    
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-[#fdf6f0] text-center px-4">
        <h1 className="text-6xl font-extrabold text-[#6B4423] mb-4">404</h1>
        <p className="text-2xl text-gray-800 mb-4">Page non trouvée</p>
        <p className="text-gray-600 mb-6 ">Il semble que vous ayez entré un lien incorrect ou que la page ait été supprimée.</p>
        <Link
            to={getRedirectUrl(role)}
            className="bg-[#6B4423] text-white px-6 py-2 rounded-full font-[robot] hover:bg-[#8a5b33] transition-all"
        >
            Retour à votre espace
        </Link>
        </div>
    );
};

export default NotFound;