export const fetchTransactions = async (token, status = "", page = 1) => {
    const response = await fetch(
      `/api/transaction?status=${status}&page=${page}`,
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

