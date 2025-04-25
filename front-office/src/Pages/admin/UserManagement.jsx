import React, { useEffect, useState } from "react";
import useToken from "../../store/useToken";
import loadingSwal from "../../utils/loadingSwal";
import { fetchUsers } from "../../services/userService";
import Swal from "sweetalert2";
import UserList from "../../components/admin/utilisateurs/userList";
import TitlePage from "../../components/Headers/responsable/TitlePage";
import SearchInput from "../../components/buttons/SearchInput";

const UserManagementPage = () => {
  const { token } = useToken();
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [searchItem, setSearchItem] = useState("");

  const fetchData = async () => {
    setIsLoading(true);
    loadingSwal("Récupération des utilisateurs");

    try {
      const dataFetch = await fetchUsers(token, searchItem);
      setUsers(dataFetch.users || []);
      setMessage(dataFetch.message || "");
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
  }, [token, searchItem]);

  return (
    <div className="w-full flex flex-col items-center md:items-start">
      <TitlePage title="Gestion des Utilisateurs" description="Gérez les utilisateurs du site" />

      <div className="w-full py-4 md:px-6 space-y-4 max-h-screen overflow-y-auto flex flex-col items-center">
        <div className="flex space-x-4">
            <div className="w-56">
                <SearchInput setSearchItem={setSearchItem} />
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
                />
            )}
        </div>
      </div>
    </div>
  );
};

export default UserManagementPage;