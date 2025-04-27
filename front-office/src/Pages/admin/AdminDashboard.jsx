import { useEffect, useState } from "react";
import TitlePage from "../../components/Headers/responsable/TitlePage"
import useToken from "../../store/useToken";
import { fetchStatistiqueAdmin } from "../../services/statistiqueService";
import Swal from "sweetalert2";

const AdminDashboard = () => {
    const { token } = useToken();
    const [statistiques, setStatistiques] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    console.log(statistiques);
    
    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
    
            try {
                const dataFetch = await fetchStatistiqueAdmin( token );
                setStatistiques(dataFetch.badges);
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
        </div>
    )
}

export default AdminDashboard;
