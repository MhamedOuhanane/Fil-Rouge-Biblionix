
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