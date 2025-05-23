
export const fetchLivre = async ( 
                token = "", 
                search = "", 
                categorie = "", 
                tag = "", 
                disponibilite = "", 
                pageLivres = 9, 
                page = 1,
                status_livre = 'Accepter',
    ) => {
        const paramFetch = `status_livre=${status_livre}&search=${encodeURIComponent(search)}&categorie=${encodeURIComponent(categorie)}&tag=${encodeURIComponent(tag)}&disponibilite=${encodeURIComponent(disponibilite)}&pageLivres=${encodeURIComponent(pageLivres)}&page=${encodeURIComponent(page)}`;
       
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


export const createLivre = async ( token, formData ) => {
    const response = await fetch('/api/livre', {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${token}`,
        },
        body: formData,
    });
    

    const result = await response.json();

    if (result.errors) {
        return {
            errors: result.errors,
            message: result?.message || '',
    }

    } else if (!response.ok) {
        throw new Error(result.message ?? result.errors);                      
    }
    
    return {
        errors: '',
        message: result.message,
    }
}

export const updateLivre = async ( token, formData, id) => {

    formData.append("_method", "PUT"); 
    const response = await fetch(`/api/livre/${id}`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${token}`,
        },
        body: formData,
    });
    

    const result = await response.json();

    if (result.errors) {
        return {
            errors: result.errors,
            message: result?.message || '',
    }

    } else if (!response.ok) {
        throw new Error(result.message ?? result.errors);                      
    }
    
    return {
        errors: '',
        message: result.message,
    }
}

export const deleteLivre = async (token, id) => {
    const response = await fetch(`/api/livre/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Failed to delete category");
    }
  
    return await response.json();
  };