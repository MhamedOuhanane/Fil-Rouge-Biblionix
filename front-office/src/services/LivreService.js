
export const fetchLivre = async ( 
                token = "", 
                search = "", 
                categorie = "", 
                tag = "", 
                disponibilite = "", 
                pageLivres = 9, 
                page = 1
    ) => {
        const paramFetch = `status_livre=Accepter&search=${encodeURIComponent(search)}&categorie=${encodeURIComponent(categorie)}&tag=${encodeURIComponent(tag)}&disponibilite=${encodeURIComponent(disponibilite)}&pageLivres=${encodeURIComponent(pageLivres)}&page=${encodeURIComponent(page)}`;
       
    try {
        const response = await fetch(`/api/livre?${paramFetch}`, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            }
        });
        
        const data = await response.json();
        if (response.ok || response.status === 404) {
            return  {
                'message': data.message || "Il n'existe actuellement aucun livre associé à notre site.",
                data: await data?.Livres ?? [],
            };
        } else {
            throw new Error(data.message || "Erreur lors de la récupération des livres");
        }
    } catch (error) {
        console.error(error);
        throw error; 
    }
}

export const FindLivre = async (token = "", livre_id) => {
    try {
        const response = await fetch(`/api/livre/${livre_id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            }
        });
        
        const data = await response.json();
        if (response.ok || response.status === 404) {
            return  {
                'message': data.message || `Il n'existe actuellement aucun livre associé d'id égale à ${livre_id}.`,
                livre: await data?.Livre ?? [],
            };
        } else {
            throw new Error(data.message || "Erreur lors de la récupération de livre");
        }
    } catch (error) {
        console.error(error);
        throw error; 
    }
}