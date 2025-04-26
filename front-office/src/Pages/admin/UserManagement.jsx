import React, { useEffect, useState } from "react";
import useToken from "../../store/useToken";
import loadingSwal from "../../utils/loadingSwal";
import { fetchUsers, updateRoleUser, updateUserStatus } from "../../services/userService";
import Swal from "sweetalert2";
import UserList from "../../components/admin/utilisateurs/userList";
import TitlePage from "../../components/Headers/responsable/TitlePage";
import SearchInput from "../../components/buttons/SearchInput";
import SelecteFilter from "../../components/filtrage/selecteFiltrage";
import { handleUserAction } from "../../components/admin/utilisateurs/handleUserAction";

const UserManagementPage = () => {
    const { token } = useToken();
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [searchItem, setSearchItem] = useState("");
    const [roleFilter, setRoleFilter] = useState("");
    const [statusFilter, setStatusFilter] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const fetchData = async () => {
        setIsLoading(true);
        loadingSwal("Récupération des utilisateurs");

        try {
            const dataFetch = await fetchUsers(token, searchItem, roleFilter, statusFilter, currentPage);
            setUsers(dataFetch.users || []);
            setMessage(dataFetch.message || "");
            setCurrentPage(dataFetch?.users?.current_page || 1);
            setTotalPages(dataFetch?.users?.last_page || 1);
            
            loadingSwal().close();
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
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [token, roleFilter,searchItem, statusFilter, currentPage]);

    const handlePreviousPage = () => {
        if (currentPage > 1) {
          setCurrentPage((prev) => prev - 1);
        }
    };
    
    const handleNextPage = () => {
        if (currentPage < totalPages) {
          setCurrentPage((prev) => prev + 1);
        }
    };
    
    const setHandleActive = (user, status) => {
        return handleUserAction(token, user, updateUserStatus, fetchData, status);
    }

    const setHandleUpdateRole = (user, status) => {
        return handleUserAction(token, user, updateRoleUser, fetchData, status);
    }

  return (
    <div className="w-full flex flex-col items-center md:items-start">
      <TitlePage title="Gestion des Utilisateurs" description="Gérez les utilisateurs du site" />

      <div className="w-full py-4 md:px-6 space-y-4 max-h-screen overflow-y-auto flex flex-col items-center">
        <div className="w-full flex flex-col items-center md:flex-row md:justify-between gap-4 md:px-4 text-sm md:text-lg">
            <div className="w-56">
                <SearchInput setSearchItem={setSearchItem} />
            </div>
            <div className="flex space-x-4">
                <SelecteFilter 
                    title="Tous les Rôles"
                    valueInisial={roleFilter} 
                    values={['librarian', 'auteur', 'lecteur']}
                    handleAction={setRoleFilter}
                    className="text-sm"
                />
                <SelecteFilter 
                    title="Tous les statuts"
                    valueInisial={statusFilter}
                    values={['En Attente', 'Active', 'Suspendu', 'Ban']}
                    handleAction={setStatusFilter}
                    className="text-sm"
                />
            </div>
        </div>
        <div className="flex w-full justify-between items-center mb-4">
            {isLoading ? (
                <div className="flex items-center space-x-2 mt-3">
                <span className="text-amber-700">Chargement...</span>
                </div>
            ) : (
                <UserList
                    users={users}
                    message={message}
                    currentPage={currentPage}
                    totalPages={totalPages}
                    handlePreviousPage={handlePreviousPage}
                    handleNextPage={handleNextPage}
                    handleActionStatus={setHandleActive}
                    handleRole={setHandleUpdateRole}
                />
            )}
        </div>
      </div>
    </div>
  );
};

export default UserManagementPage;