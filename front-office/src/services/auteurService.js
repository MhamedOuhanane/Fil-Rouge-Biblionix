export const fetchAuteurs = async (token = "", search = "", page = 1, pagination = 7) => {
    const response = await fetch(`/api/auteur?pagination=${encodeURIComponent(pagination)}&search=${encodeURIComponent(search)}&page=${encodeURIComponent(page)}`, {
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
    });

    const data = await response.json();
    
    if (response.status == 404 || response.ok) {
      return {
        message: await data.message,
        autuers: await data.Auteurs,
      }
    } else if (!response.ok) {
      throw new Error(data.message);
    }
};
