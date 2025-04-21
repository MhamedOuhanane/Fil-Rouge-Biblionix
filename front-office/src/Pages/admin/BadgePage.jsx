import { useEffect, useState } from "react"
import Swal from "sweetalert2";
import { SpinnerLoadingIcon } from "../../Icons/Icons";
import useToken from "../../store/useToken";
import BadgeList from "../../components/admin/badge/BadgeList";

const BadgePage = () => {
    const { token, user } = useToken();
    const [badges, setBadges] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMssage] = useState('');
    const [searchItem, setSearchItem] = useState("");
    const [showModal, setShowModal] = useState(false);
    
    

    const fetchBadge = async () => {
        setIsLoading(true);
        try {
            const response = await fetch(`api/badge?search=${encodeURIComponent(searchItem)}`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const data = await response.json();

            if (response.status == 404) {
                setMssage(data.message);
            } else if (!response.ok) {
                Swal.fire({
                    icon: 'error',
                    title: 'Erreur de récupération',
                    text: data.message || 'Une erreur est survenue lors de la récupération des badges.',
                    confirmButtonText: "Réssayer",
                    confirmButtonColor: 'red',
                })
            } else {
                // Swal.fire({
                //     title: 'Succès',
                //     text: data.message,
                //     toast: true,
                //     position: "top-end",
                //     showConfirmButton: false,
                //     timer: 2000,
                //     icon: 'success',
                //     color: 'green',
                //     background: '#FCE3C9',

                // })
                setBadges(data.badges);
                setMssage(data.message);
                console.log(data.badges);
                
            }
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Erreur de récupération',
                text: error.message,
                confirmButtonColor: 'red',
                confirmButtonText: 'Réssayer',
            })
        }
        setIsLoading(false);
    }
    
    useEffect (() => {
        fetchBadge();
    }, [searchItem]);
        

    //   const handleAddBadge = (newBadge) => {
    //     setBadges([...badges, newBadge])
    //   }


    return (
        <div className="relative w-full flex flex-col items-center md:items-start">
            <div className="p-4 border-b border-[#8B4513] md:text-start text-center w-full">
                <h1 className="text-lg font-semibold text-gray-800">Badge Management</h1>
                <p className="text-sm text-gray-500">Create and manage your badges</p>
            </div>
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
        
        </div>
    )
}

export default BadgePage;
