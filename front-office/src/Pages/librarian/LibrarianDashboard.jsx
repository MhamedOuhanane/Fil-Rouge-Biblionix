import { useEffect, useState } from "react";
import TitlePage from "../../components/Headers/responsable/TitlePage"
import useToken from "../../store/useToken";
import { fetchStatistiqueLibrarian } from "../../services/statistiqueService";
import Swal from "sweetalert2";
import { StatistiqueCard } from "../../components/dashboard/StatistiqueCard";
import { SpinnerLoadingIcon } from "../../Icons/Icons";
import { ReservationLineChart } from "../../components/dashboard/Charts";

const AdminDashboard = () => {
    const { token } = useToken();
    const [statistiques, setStatistiques] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    
    const stats = [
        { id:1, title: "Réservation", icon: "📅", rating: statistiques?.reservationCount ?? 0, },
        { id:2, title: "Avis sur les Livres", icon: "⭐", rating: statistiques?.ReviewLivreCount ?? 0, },
        { id:3, title: "Avis sur les Auteurs", icon: "⭐", rating: statistiques?.ReviewAuteurCount ?? 0, },
        { id:4, title: "Livres ", icon: "📚", rating: statistiques?.LivreCount ?? 0, },
    ];
    
    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
    
            try {
                const dataFetch = await fetchStatistiqueLibrarian( token );
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
            
            <div className="w-full p-5 max-h-[630px] overflow-y-auto scrollbar-hide">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 w-full gap-4 mb-10">
                    {isLoading ? (
                        <div className="w-full flex justify-center items-center space-x-2 mt-3">
                            <SpinnerLoadingIcon />
                            <span className="text-amber-700">Chargement...</span>
                        </div>
                    ) : (stats.map(stat => (
                            <StatistiqueCard key={stat.id} title={stat.title} icon={stat.icon} rating={stat.rating}/>
                    )))}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    <div className="col-span-1 lg:col-span-2 space-y-3">
                        <ReservationLineChart reservationData={statistiques?.reservation} />
                    </div>
                </div>
            </div>
            
        </div>
    )
}

export default AdminDashboard;
