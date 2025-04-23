import { useEffect, useState } from "react"
import Swal from "sweetalert2";
import useToken from "../../store/useToken";
import BadgeList from "../../components/admin/badge/BadgeList";
import { fetchBadge, ResestBadge } from "../../services/badgeService";
import BadgeForm from "../../components/admin/badge/BadgeForm";
import { loadingSwal } from "../../utils/loadingSwal";
import TitlePage from "../../components/Headers/responsable/TitlePage";
import SearchInput from "../../components/buttons/SearchInput";
import AddButton from "../../components/buttons/AddButton";

const BadgePage = () => {
    const { token } = useToken();
    
    const [badges, setBadges] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMssage] = useState('');
    const [searchItem, setSearchItem] = useState("");
    const [showModal, setShowModal] = useState(false);
    
    const fetchData = async () => {
        setIsLoading(true);
        loadingSwal('Fetching badges');

        try {
            const dataFetch = await fetchBadge( token, searchItem );
            setBadges(dataFetch.badges);
            setMssage(dataFetch.message);
        } catch (error) {
            loadingSwal().close();
            Swal.fire({
                icon: 'error',
                title: 'Erreur de récupération',
                text: error.message,
                confirmButtonText: 'Réssayer',
                confirmButtonColor: 'red',
            });
        } finally {
            setIsLoading(false);
            loadingSwal().close();
        }
    };

    useEffect(() => {
        fetchData(); 
    }, [searchItem, showModal, token]);

    const handleAddClick = async () => {
        const result = await Swal.fire({
            icon: "info",
            title: "Ajouter badge",
            text: "Vous êtes sur le point de créer une nouvelle catégorie. Proceed?",
            showCancelButton: true,
            confirmButtonText: "Yes, Proceed",
            cancelButtonText: "Cancel",
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
        });

        if (result.isConfirmed) {
            setShowModal(true);
        }
    };
    
    const softDeleteBadge = async (badge) => {
        
        try {
            const success = await ResestBadge(token, badge?.id); 
            if (success) {
                setBadges((prevBadges) =>
                    prevBadges.map((b) =>
                        b.id === badge.id
                            ? { ...b, deleted_at: b.deleted_at ? null : new Date().toISOString() }
                            : b
                    )
                );
            };
            
            Swal.fire({
                icon: 'success',
                title: badge?.deleted_at ? 'Badge restauré' : 'Badge supprimé',
                showConfirmButton: false,
                timer: 1300
            });
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: error.message || 'An error occurred',
                confirmButtonText: 'Réssayer',
                confirmButtonColor: 'red',
            });
        }
    };
    

    return (
        <div className="w-full flex flex-col items-center md:items-start">
            <TitlePage title="Géstion Des Badges" description="Créez et gérez vos badges" />

            <div className="w-full py-4 px-4 max-h-screen overflow-y-auto flex flex-col items-center">
                  {showModal ? (
                    <div className="bg-[#FCE3C9] p-6 rounded-lg shadow-lg w-full md:w-[60%]">
                        <h2 className="text-lg font-semibold text-center mb-4">Create Badge</h2>
                        <BadgeForm setShowModal={setShowModal} /> 
                    </div>
                  ) : (
                    <>
                        <div className="flex w-full justify-between items-center p-4">
                            <div className="w-full max-w-xs">
                                <SearchInput setSearchItem={setSearchItem} />
                            </div>
                            <AddButton title="Ajouter Badge" handleAddClick={handleAddClick} />
                        </div>

                        <div className="flex-1 w-full max-h-[400px] scrollbar-hide overflow-auto flex justify-center">
                          {isLoading ? (
                            <div className="flex items-center space-x-2 mt-3">
                            <span className="text-amber-700">Chargement...</span>
                            </div>
                          ) : (
                            <BadgeList badges={badges} message={message} softDeleteBadge={softDeleteBadge} />
                          )}
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}

export default BadgePage;
