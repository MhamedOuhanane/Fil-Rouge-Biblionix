
export const fetchLivre = async ( 
                token = "", search = "", 
                categorie = "", 
                tag = "", 
                disponibilite = "", 
                pageLivres = "", 
                page = 1
        ) => {
    const response = await fetch(`/api/livre/status_livre=Accepter&search=${search}&categorie=${categorie}&tag=${tag}&disponibilite=${disponibilite}&pageLivres=${pageLivres}&page=${page}`, {
        headers: {
            Authorizatin: `Bearer ${token}`,
            "Content-Type": "application/json",
        }
    });
    
    const data = await response.json();

    if (response.status === 404 || response.ok) {
        return await data;
    } else {
        throw new Error(data.message || "Erreur lour de la récuperation des livres");
    }
}