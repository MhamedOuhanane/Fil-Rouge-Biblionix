
export const fetchReservation = async ( token, page = 1) => {
    try {
        
        const response = await fetch(`/api/reservation?page=${encodeURIComponent(page)}`, {
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        }
    });

    const data = await response.json();
    if (response.ok || response.status === 404) {
        
        return  {
            'message': data.message || "Il n'existe actuellement aucun reservation.",
            data: await data?.Reservation ?? [],
        };
    } else {
        throw new Error(data.message || "Erreur lors de la récupération des livres");
    }
    } catch (error) {
        console.error(error);
        throw error; 
    }
}

export const CreateReservation = async (token, formData) => {
    const response = await fetch("/api/reservation", {
        method: "POST",
        headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
    });

    const data = await response.json();
    if (data.errors) {
      return {
        message: data.message,
        errors: data.errors,
      }
    }

    if (!response.ok) {
        throw new Error(data.message || "Échec de la reservation de livre");
    }

    return await data;
};

