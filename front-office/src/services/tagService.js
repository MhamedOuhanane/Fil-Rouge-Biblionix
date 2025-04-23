export const fetchTags = async (token, search = "") => {
    const response = await fetch(`/api/tags?search=${search}`, {
        method: "GET",
        headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        },
    });

    if (response.status === 404) {
        return {
        message: response.message,
        tags: [],
        };
    }

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Échec de la récupération des tags");
    }

    return await response.json();
};

export const createTag = async (token, names) => {
    const response = await fetch("/api/tags", {
        method: "POST",
        headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: names }),
    });

    const data = await response.json();
    if (data.errors) {
      return {
        message: data.message,
        errors: data.errors,
      }
    }

    if (!response.ok) {
        throw new Error(data.message || "Échec de la création du tag");
    }

    return await data;
};

export const updateTag = async (token, id, name) => {
    const response = await fetch(`/api/tags/${id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name }),
    });

    const data = await response.json();
    if (data.errors) {
      return {
        message: data.message,
        errors: data.errors,
      }
    }
  
    if (!response.ok) {
      throw new Error(data.message || "Échec de la mise à jour du tag");
    }
  
    return await data;
};