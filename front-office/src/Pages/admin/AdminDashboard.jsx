import { useEffect, useState } from "react";
import TitlePage from "../../components/Headers/responsable/TitlePage"
import useToken from "../../store/useToken";
import { fetchStatistiqueAdmin } from "../../services/statistiqueService";
import Swal from "sweetalert2";
import { StatistiqueCard } from "../../components/dashboard/StatistiqueCard";
import { SpinnerLoadingIcon } from "../../Icons/Icons";

const AdminDashboard = () => {
    const { token } = useToken();
    const [statistiques, setStatistiques] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    
    const stats = [
        { title: "Transactions Active", icon: "💳", rating: statistiques?.transactionCount, },
        { title: "Avis sur les Livres", icon: "⭐📖", rating: statistiques?.ReviewLivreCount, },
        { title: "Livres ", icon: "📚", rating: statistiques?.LivreCount, },
        { title: "Membres Enregistrés", icon: "👥", rating: statistiques?.userCount, },
    ];
    
    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
    
            try {
                const dataFetch = await fetchStatistiqueAdmin( token );
                setStatistiques(dataFetch.statistique);
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
    }, [token]);

    return (
        <div className="w-full flex flex-col items-center md:items-start">
            <TitlePage title="Tableau De Bord" description="Afficher les statistique du site avec les diagramme" />
            
            <div className="w-full p-5 max-h-screen overflow-y-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 w-full gap-4 mb-5">
                    {isLoading ? (
                        <div className="w-full flex justify-center items-center space-x-2 mt-3">
                            <SpinnerLoadingIcon />
                            <span className="text-amber-700">Chargement...</span>
                        </div>
                    ) : (stats.map(stat => (
                            <StatistiqueCard title={stat.title} icon={stat.icon} rating={stat.rating}/>
                    )))}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    <div className="col-span-1 lg:col-span-2">
                    </div>
                    <div className="col-span-1">
                    </div>
                </div>
            </div>
            
        </div>
    )
}

export default AdminDashboard;
