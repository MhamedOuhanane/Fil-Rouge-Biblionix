export const fetchCategories = async (token, search = "") => {
  const response = await fetch(`/api/categorie?search=${search}`, {
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

export const createCategorie = async (token, formData) => {
    const response = await fetch("/api/categorie", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });
  
    const data = await response.json();
    
    if (data.errors) {
      return {
        message: data.message,
        errors: data.errors,
      }
    }
    
    
    if (!response.ok) {
      throw new Error(data.message || "Failed to create category");
    }
  
    return await data;
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
  
    const data = await response.json();
    if (data.errors) {
      return {
        message: data.message,
        errors: data.errors,
      }
    }
  
    if (!response.ok) {
      throw new Error(data.message || "Failed to update category");
    }
  
    return await data;
};

export const deleteCategorie = async (token, id) => {
  const response = await fetch(`/api/categorie/${id}`, {
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