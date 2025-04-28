
export const fetchLivre = async ( 
                token = "", 
                search = "", 
                categorie = "", 
                tag = [], 
                disponibilite = "", 
                pageLivres = 9, 
                page = 1
    ) => {
    const tagQuery = tag?.map(t => encodeURIComponent(t)).join('&tag=');
    const paramFetch = `status_livre=Accepter&search=${encodeURIComponent(search)}&categorie=${encodeURIComponent(categorie)}&tag=${tagQuery}&disponibilite=${encodeURIComponent(disponibilite)}&pageLivres=${encodeURIComponent(pageLivres)}&page=${encodeURIComponent(page)}`;
       
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