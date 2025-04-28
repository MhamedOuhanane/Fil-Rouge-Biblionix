
export const fetchLivre = async ( 
                token = "", 
                search = "", 
                categorie = "", 
                tag = "", 
                disponibilite = "", 
                pageLivres = "", 
                page = 1
    ) => {
    try {
        const response = await fetch(`/api/livre?status_livre=Accepter&search=${search}&categorie=${categorie}&tag=${tag}&disponibilite=${disponibilite}&pageLivres=${pageLivres}&page=${page}`, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            }
        });

        
        const data = await response.json();
        if (response.ok || response.status === 404) {
            return  {
                'message': "Il n'existe actuellement aucun livre associé à notre site.",
                data: await data?.Livres?.data ?? [],
            };
        } else {
            throw new Error(data.message || "Erreur lors de la récupération des livres");
        }
    } catch (error) {
        console.error(error);
        throw error; 
    }
}