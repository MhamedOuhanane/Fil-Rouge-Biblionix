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