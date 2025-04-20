import { useEffect, useState } from "react"
import Swal from "sweetalert2";
import { SpinnerLoadingIcon } from "../../Icons/Icons";

const BadgePage = () => {
    const [badges, setBadges] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [searchItem, setSearchItem] = useState('');

    const fetchBadge = async () => {
        setIsLoading(true);
        try {
            const response = await fetch(`api/badge?search=${encodeURIComponent(searchItem)}`, {
                method: 'GET',
            });

            const data = await response.json();

            if (!response.ok) {
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
                // console.log(data.message);
                // console.log(data.badges);
                
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
        <div className="w-full flex flex-col">
            <div className="p-4 border-b border-gray-200">
                <h1 className="text-lg font-semibold text-gray-800">Badge Management</h1>
                <p className="text-sm text-gray-500">Create and manage your badges</p>
            </div>

            <div className="flex-1 overflow-auto flex justify-center items-center">
            {isLoading && (
                <div className="flex items-center space-x-2">
                <SpinnerLoadingIcon size={24} color="blue" />
                <span className="text-gray-500">Chargement des données...</span>
                </div>
            )}
            </div>
        
        </div>
    )
}

export default BadgePage;
