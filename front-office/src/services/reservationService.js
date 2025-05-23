
export const fetchReservation = async ( token, page = 1, statusRes = "", statusPro = "") => {
    try {
        
        const response = await fetch(`/api/reservation?page=${encodeURIComponent(page)}&status_Res=${encodeURIComponent(statusRes)}&status_Pro=${encodeURIComponent(statusPro)}`, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            }
        });

        const data = await response.json();
        if (response.ok || response.status === 404) {
            return  {
                'message': data.message || "Il n'existe actuellement aucun reservation.",
                data: data?.Reservation ?? [],
            };
        } else {
            throw new Error(data.message || "Erreur lors de la récupération des reservations");
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


export const updateReservation = async (token, reservation, formData) => {
    
    const response = await fetch(`/api/reservation/${reservation.id}`, {
        method: "PUT",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
    });
    
    const data = await response.json();
    
    if (!response.ok) {
        throw new Error(data.message || "Échec de modifier la reservation");
    }

    return await data;
};


export const updateStatusReservation = async (token, reservation, formData) => {
    
    const response = await fetch(`/api/reservation/status/${reservation.id}`, {
        method: "PATCH",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
    });
    
    const data = await response.json();
    
    if (!response.ok) {
        throw new Error(data.message || "Échec du modifié la status de reservation ");
    }

    return await data;
};


export const deleteReservation = async (token, reservation) => {
    const response = await fetch(`/api/reservation/${reservation.id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  
    if (!response.ok) {
      const error = await response.json();
      throw error;
    }
  
    return await response.json();
  };
