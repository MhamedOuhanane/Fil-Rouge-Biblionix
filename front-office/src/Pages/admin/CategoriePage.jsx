import React, { useEffect, useState } from "react";
import useToken from "../../store/useToken";
import Swal from "sweetalert2";
import { fetchCategories } from "../../services/categorieService";
import CategorieList from "../../components/admin/categorie/CategorieList";
import { loadingSwal } from "../../utils/loadingSwal";
import TitlePage from "../../components/Headers/responsable/TitlePage";
import SearchInput from "../../components/buttons/SearchInput";

const CategoriePage = () => {
    const { token } = useToken();
    const [categories, setCategories] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [searchItem, setSearchItem] = useState("");

  const fetchData = async () => {
    setIsLoading(true);
    loadingSwal('Fetching categories');

    try {
        const dataFetch = await fetchCategories(token, searchItem);
        setCategories(dataFetch.categories);
        setMessage(dataFetch.message);
    } catch (error) {
        loadingSwal().close();
        await Swal.fire({
            icon: "error",
            title: "Erreur de récupération",
            text: error.message,
            confirmButtonText: "Réessayer",
            confirmButtonColor: "#d33",
        });
    } finally {
        setIsLoading(false)
        loadingSwal().close();
    }
  };

    useEffect(() => {
        fetchData();
    }, [searchItem, token]);

  return (
    <div className="w-full flex flex-col items-center md:items-start">
        <TitlePage title="Géstion Des Catégories" description="Créez et gérez vos catégories" />

        <div className="w-full py-4 px-4 max-h-screen overflow-y-auto flex flex-col items-center">
            <div className="flex w-full justify-between items-center p-4">
                <div className="w-full max-w-xs">
                    <SearchInput setSearchItem={setSearchItem} />
                </div>
            </div>

            <div className="flex-1 mt-4 w-full md:px-14 max-h-[60vh] scrollbar-hide overflow-auto flex justify-center">
                {isLoading ? (
                    <div className="flex items-center space-x-2 mt-3">
                    <span className="text-amber-700">Chargement...</span>
                    </div>
                ) : (
                    <CategorieList
                    categories={categories}
                    message={message}
                    />
                )}
            </div>
        </div>
    </div>
  );
};

export default CategoriePage;