export const fetchTags = async (token, search = "") => {
    const response = await fetch(`/api/tag?search=${search}`, {
        method: "GET",
        headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        },
    });

    const data = await response.json();
    
    if (response.status == 404) {
      return {
        badges: [],
        message: data.message,
      }
    } else if (!response.ok) {
      throw new Error(data.message);
    }

    return await data;
};

export const createTag = async (token, tagsArray) => {
    const names = tagsArray.map(tag => tag.name);
    
    const response = await fetch("/api/tag", {
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
    console.log(name);
    const response = await fetch(`/api/tag/${id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: name }),
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