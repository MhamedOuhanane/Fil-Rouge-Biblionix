import { Link } from "react-router-dom";
import { getRedirectUrl } from "../../utils/roles";
import useToken from "../../store/useToken";


const Unauthorized = () => {
    const { user } = useToken();
    const role = user?.role ?? 'visiteur';
    
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-[#f8f4f0] text-center px-4">
            <h2 className="text-5xl font-bold text-[#6B4423] mb-4">⛔️ Accès Refusé</h2>
            <p className="text-lg text-gray-700 mb-6">
                Vous n'avez pas les permissions nécessaires pour accéder à cette page.
            </p>
            <Link
                to={getRedirectUrl(role)}
                className="inline-block bg-[#6B4423] text-white px-6 py-2 rounded-full font-[robot] hover:bg-[#8a5b33] transition-all"
            >
                Retour à votre espace
            </Link>
        </div>
    );
};

export default Unauthorized;