export const fetchTransactions = async (token, search = "", role = "", status = "") => {
    const response = await fetch(
      `/api/users?search=${search}&role=${role}&status=${status}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    
    const data = await response.json();
  
    if (response.status === 404) {
      return {
        message: data.message || "Il n'éxist aucun utilisateurs.",
      }
    }
  
    if (!response.ok) {
      throw new Error(data.message || "Erreur lors de la récupération des utilisateurs");
    }
    
    return data;
};

