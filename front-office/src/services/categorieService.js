export const fetchCategories = async (token, search = "") => {
  const response = await fetch(`/api/categorie?search=${search}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (response.status === 404) {
    return response.json({
        message: response.message,
        categories: [],
    });
  }

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to fetch categories");
  }

  return await response.json();
};

export const createCategorie = async (token, formData) => {
    const response = await fetch("/api/categorie", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });
  
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Failed to create category");
    }
  
    return await response.json();
};

export const updateCategorie = async (token, id, formData) => {
    formData.append("_method", "PUT"); 
    const response = await fetch(`/api/categorie/${id}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });
  
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Failed to update category");
    }
  
    return await response.json();
};