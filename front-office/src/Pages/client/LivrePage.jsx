import { useEffect, useState } from "react";
import { fetchLivre } from "../../services/LivreService";
import Swal from "sweetalert2";
import BookCard from "../../components/visiteur/LivreCard";
import { SpinnerLoadingIcon } from "../../Icons/Icons";
import { useParams } from "react-router-dom";
import { SelecteCategorie, SelecteFilter, SelecteFilterId } from "../../components/filtrage/selecteFiltrage";
import { fetchCategories } from "../../services/categorieService";
import { fetchTags } from "../../services/tagService";
import SearchInput from "../../components/buttons/SearchInput";
import PaginationGrad from "../../components/pagination/paginationGrid";
import LivrePopup from "../../components/dashboard/LivrePopup";
import useToken from "../../store/useToken";

const LivrePage = () => {
    const { user } = useToken();
    const { categorie_id } = useParams();
    
    const [livres, setLivres] = useState([]);
    const [categories, setCategories] = useState([]);
    const [tags, setTags] = useState([]);
    const [tagId, setTagId] = useState("");
    const [disdisponibilite, setDisponibilite] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [searchItem, setSearchItem] = useState("");
    const [showPopup, setShowPopup] = useState(false);
    const [pagination, setPagination] = useState({
        current_page: 1,
        per_page: 9,
        total: 0,
        last_page: 1,
    });
    
    useEffect(() => {
        const fetchCate = async () => {
            setIsLoading(true);
            try {
            const dataFetch = await fetchCategories();
            setCategories(dataFetch.categories);
            
            } catch (error) {
            await Swal.fire({
                icon: "error",
                title: "Erreur de récupération",
                text: error.message,
                confirmButtonText: "Réessayer",
                confirmButtonColor: "#d33",
            });
            } finally {
            setIsLoading(false);
            }
        };

        const getTags = async () => {
            setIsLoading(true);
            try {
            const dataFetch = await fetchTags();
            setTags(dataFetch.tags);
            
            } catch (error) {
            await Swal.fire({
                icon: "error",
                title: "Erreur de récupération",
                text: error.message,
                confirmButtonText: "Réessayer",
                confirmButtonColor: "#d33",
            });
            } finally {
            setIsLoading(false);
            }
        };
        getTags();
        fetchCate();
    }, []);
    
    

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const dataFetch = await fetchLivre("", searchItem, categorie_id ?? "", tagId, disdisponibilite, pagination.per_page, pagination.current_page);
                setLivres(dataFetch.data.data);
                setMessage(dataFetch.message);  
                setPagination({
                    current_page: dataFetch?.data?.current_page,
                    per_page: dataFetch?.data?.per_page,
                    total: dataFetch?.data?.total,
                    last_page: dataFetch?.data?.last_page,
                });   

            } catch (error) {
                await Swal.fire({
                    icon: "error",
                    title: "Erreur de récupération",
                    text: error.message,
                    confirmButtonText: "Réessayer",
                    confirmButtonColor: "#d33",
                });
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, [categorie_id, tagId, disdisponibilite, searchItem, pagination.per_page, pagination.current_page]);
    
    const handlePreviousPage = () => {
        if (pagination.current_page > 1) {
            setPagination((prev) => ({
                ...prev,
                current_page: pagination.current_page - 1,
            }));
        }
    };
    
    const handleNextPage = () => {
        if (pagination.current_page < pagination.last_page) {
            setPagination((prev) => ({
                ...prev,
                current_page: pagination.current_page + 1,
            }));
        }
    };

    const handlePerPage = (value) => {
        setPagination((prev) => ({
            ...prev,
            per_page: value,
            current_page: 1,
        }));
    };
    

    return (
        <div className="bg-[#FDF5E6] min-h-screen">
            <section className="bg-[#F5E6CC] py-12 px-6 text-center mb-5">
                <h1 className="text-xl md:text-4xl font-bold text-[#8B4513] mb-4">Découvrez Nos Livres</h1>
                <p className="text-gray-600 text-sm md:text-lg max-w-2xl mx-auto">
                    Parcourez notre vaste collection de livres, filtrez par catégorie, tags ou disponibilité, et trouvez votre prochaine lecture préférée.
                </p>
                {user && user?.role === 'auteur' && 
                    <div className="flex justify-center px-10 mt-4">
                        <button
                            onClick={() => setShowPopup(true)}
                            className="px-4 py-2 bg-[#8B4513] text-white rounded hover:bg-[#7f4820] transition"
                        >
                            Ajouter un Livre
                        </button>
                    </div>
                }
            </section>

            <div className="max-w-6xl mx-auto mb-8">
                <div className="grid grid-cols-1 px-10 md:grid-cols-4 gap-4">
                    <SearchInput 
                        setSearchItem={setSearchItem}
                    />
                    <SelecteCategorie 
                        title={'🗃️ Tous les categories'} 
                        valueInisial={categorie_id} 
                        values={categories} 
                    />
                    <SelecteFilterId 
                        title={'🏷️ Tous les tags'} 
                        valueInisial={tagId} 
                        values={tags} 
                        handleAction={setTagId} />
                    <SelecteFilter 
                        title='📌 Disponibilité' 
                        valueInisial={disdisponibilite} 
                        values={['Disponible', 'Rupture de stock', 'Indisponible']}
                        handleAction={setDisponibilite}
                    />
                </div>
            </div>
            <div className="mx-auto  px-8 md:px-16 pb-9">
                <div className="flex justify-between items-center mb-6 text-xs md:text-sm">
                    <div>
                        <label className="text-gray-700 mr-2">Livres par page 🔢:</label>
                        <SelecteFilter 
                            title={'9'} 
                            valueInisial={pagination.per_page}
                            values={['15','24']}
                            handleAction={handlePerPage}
                        />
                    </div>
                    <div className="text-gray-700">
                        {`Affichage de ${livres.length} livres sur ${pagination.total}`}
                    </div>
                </div>
                {isLoading ? (
                    <div className="flex justify-center items-center space-x-2 mt-3">
                        <SpinnerLoadingIcon />
                        <span className="text-amber-700">Chargement...</span>
                    </div>
                ) : (livres && livres.length > 0 ? (
                    <>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 pb-5">
                            {livres.map((livre) => (
                                <BookCard
                                    key={livre.id}
                                    livre={livre}
                                />
                            ))}
                        </div>
                        <PaginationGrad 
                            currentPage={pagination.current_page}
                            totalPages={pagination.last_page}
                            handleNextPage={handleNextPage}
                            handlePreviousPage={handlePreviousPage}
                        />
                    </>
                ) : (
                    <p className="text-center text-orange-400">{message}</p>
                ))}
            </div>
            {user && user?.role === 'auteur' &&
                <LivrePopup
                    show={showPopup}
                    onClose={() => {setShowPopup(false);}}
                    categories={categories}
                    tags={tags}
                />
            }
        </div>
    );
};

export default LivrePage;