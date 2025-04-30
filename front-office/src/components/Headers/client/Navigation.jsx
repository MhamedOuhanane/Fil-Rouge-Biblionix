import { Link, useLocation } from "react-router-dom";
import useToken from "../../../store/useToken";


const Navigation = ({ ...proprs }) => {
    const { pathname } = useLocation();
    const { user } = useToken();
    const isLoggedIn = !!user;

    const stylePathName = (paths) => {return paths.includes(pathname) ? 'text-[#CD853F]' : ''};


    return (

        <ul { ...proprs }>
            <li>
                <Link to="/" className={stylePathName(["/"])}>Accueil</Link>
            </li>
            <li className="relative group">
                <Link to={'/library'} className={`flex items-center cursor-pointer ${stylePathName(["/library/livres", "/library"])}`}>
                    Bibliothèque
                    <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="ml-1 transform transition-transform duration-300 group-hover:rotate-180"
                    viewBox="0 0 16 16"
                    >
                    <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
                    </svg>
                </Link>

                <div className="absolute left-0 top-full bg-[#c6a88f] shadow-lg  rounded-md opacity-0 
                                group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto 
                                transition-all duration-300 z-30">

                    <ul className="flex flex-col p-2 text-sm text-gray-700">
                        <li>
                            <Link
                            to="/library"
                            className={`block px-4 py-2 hover:bg-[#c3956d] rounded transition ${pathname === '/library' ? 'bg-[#c3956d]' : ''}`}
                            >
                            Catégories
                            </Link> 
                        </li>
                        <li>
                            <Link
                            to="/library/livres"
                            className={`block px-4 py-2 hover:bg-[#c3956d] rounded transition ${pathname === '/library/livres' ? 'bg-[#c3956d]' : ''}`}
                            >
                            Livres
                            </Link>
                        </li>
                    </ul>
                </div>
            </li>

            {isLoggedIn && (
                <>
                    <li><Link to='/reservation' className={` ${stylePathName(["/reservation"])}`}>Mes Réservation</Link></li>
                    <li><Link to='/author' className={` ${stylePathName(["/author"])}`}>Ecrivains</Link></li>
                </>
            )}
        </ul>
    );
}

export default Navigation;