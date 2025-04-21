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

    //   const handleRemoveBadge = (badgeId) => {
    //     setBadges(badges.filter((badge) => badge.id !== badgeId))
    //   }

    return (
        <div className="w-full flex flex-col items-center md:items-start">
            <div className="p-4 border-b border-[#8B4513] md:text-start text-center w-full">
                <h1 className="text-lg font-semibold text-gray-800">Badge Management</h1>
                <p className="text-sm text-gray-500">Create and manage your badges</p>
            </div>

            <div className="flex-1 w-full overflow-auto flex justify-center items-center py-2">
            {isLoading ? (
                <div className="flex items-center space-x-2">
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
