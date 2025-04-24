
export const getUserEmail = async (email , badge = 'Gratuit') => {
    const response = await fetch(`/api/utilisateur/findEmail?email=${encodeURIComponent(email)}&badge=${encodeURIComponent(badge)}`, {
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