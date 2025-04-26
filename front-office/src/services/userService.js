export const fetchUsers = async (token, search = "", role = "", status = "") => {
  const response = await fetch(
    `/api/users?search=${search}&role=${role}&status=${status}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );
  
  const data = await response.json();

  if (response.status === 404) {
    return {
      message: data.message || "Il n'éxist aucun utilisateurs.",
    }
  }

  if (!response.ok) {
    throw new Error(data.message || "Erreur lors de la récupération des utilisateurs");
  }
  
  return data;
};

export const updateUserStatus = async (token, user, status) => {
  if (!status) {
    throw new Error("Aucun statut spécifié. Impossible de modifier le statut de l'utilisateur.");
  } else if (user?.status === status) {
    throw new Error("L'utilisateur a déjà ce statut. Aucune modification nécessaire.");
  }

  const response = await fetch(`/api/users/${user.id}`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      status: status,
    }),
  });
  
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || `Erreur lors de la modification du status de ${user?.first_name} ${user?.last_name}`);
  }
  
  return data;
};

export const updateRoleUser = async (token, user, event) => {
  if (!event) {
    throw new Error("L'événement est requis (Promotion ou Démotion).");
  }  else if (event === 'Promotion' && user?.role.name !== 'auteur') {
    throw new Error("La promotion n'est possible que pour les utilisateurs ayant le rôle 'auteur'.");
  } else if (event === 'Démotion' && user?.role.name !== 'librarian') {
    throw new Error("La démission n'est possible que pour les utilisateurs ayant le rôle 'librarian'.");
  }

  const response = await fetch(`/api/user.role/${user.id}`, {
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({event: event}),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || `Erreur lour de la ${event} de l'utilisateur ${user.first_name} ${user.last_name}`)
  }

  return await data;  
}


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