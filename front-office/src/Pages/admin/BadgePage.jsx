import { useEffect, useState } from "react"
import Swal from "sweetalert2";
import { SpinnerLoadingIcon } from "../../Icons/Icons";
import useToken from "../../store/useToken";
import BadgeList from "../../components/admin/badge/BadgeList";
import { fetchBadge } from "../../services/badgeService";
import BadgeForm from "../../components/admin/badge/BadgeForm";

const BadgePage = () => {
    const { token } = useToken();
    
    const [badges, setBadges] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMssage] = useState('');
    const [searchItem, setSearchItem] = useState("");
    const [showModal, setShowModal] = useState(false);
    
    useEffect(() => {
        console.log(token);
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const dataFetch = await fetchBadge( token, searchItem );
                setBadges(dataFetch.badges);
                setMssage(dataFetch.message);
            } catch (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Erreur de récupération',
                    text: error.message,
                    confirmButtonText: 'Réssayer',
                    confirmButtonColor: 'red',
                });
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();

    }, [searchItem, token]);
        

    //   const handleAddBadge = (newBadge) => {
    //     setBadges([...badges, newBadge])
    //   }


    return (
        <div className="w-full flex flex-col items-center md:items-start">
            <div className="p-4 border-b border-[#8B4513] md:text-start text-center w-full">
                <h1 className="text-lg font-semibold text-gray-800">Badge Management</h1>
                <p className="text-sm text-gray-500">Create and manage your badges</p>
            </div>

            <div className="w-full py-4 px-4 max-h-screen overflow-y-auto flex flex-col items-center">
                {showModal ? (
                    <div className="bg-[#FCE3C9] p-6 rounded-lg shadow-lg w-full md:w-[60%]">
                        <h2 className="text-lg font-semibold text-center mb-4">Create New Badge</h2>
                        <BadgeForm setShowModal={setShowModal} /> 
                    </div>
                ) : (
                    <>
                        <div className="flex w-full justify-between items-center p-4">
                            <div className="w-full max-w-xs">
                                <input
                                    type="text"
                                    className="w-full p-2 border rounded-lg"
                                    placeholder="Rechercher un badge..."
                                    value={searchItem}
                                    onChange={(e) => setSearchItem(e.target.value)}
                                />
                            </div>
                            {/* Bouton pour ouvrir le formulaire d'ajout de badge */}
                            <button
                                className="bg-blue-500 text-white text-xs md:text-lg px-4 py-2 rounded-lg ml-4"
                                onClick={() => setShowModal(true)}
                            >
                                Ajouter un Badge
                            </button>
                        </div>

                        <div className="flex-1 w-full max-h-[400px] overflow-auto flex justify-center">
                        {isLoading ? (
                            <div className="flex items-center space-x-2 mt-3">
                                <SpinnerLoadingIcon size={24} color="#6B4423" />
                            <span className="text-gray-500">Chargement des données...</span>
                            </div>
                        ) : (
                            <BadgeList badges={badges} message={message} />
                        )}
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}

export default BadgePage;
