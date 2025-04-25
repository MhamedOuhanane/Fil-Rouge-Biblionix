export const fetchUsers = async (token, search = "", role = "", status = "") => {
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
      message: data.message || "I"
    }
  }

  if (!response.ok) {
    throw new Error(data.message || "Erreur lors de la récupération des utilisateurs");
  }
  
  return data;
};


export const getUserEmail = async (email , badgeId = null) => {
    const response = await fetch(`/api/utilisateur/findEmail/${badgeId}?email=${encodeURIComponent(email)}`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
        },
    });

    const data = await response.json();
    if (data.errors) {
      return {
        message: data.message,
        errors: data.errors,
      }
    }
  
    if (!response.ok) {
      throw new Error(data.message || "Échec de trouver l'utilisateur");
    }
  
    return await data;
}