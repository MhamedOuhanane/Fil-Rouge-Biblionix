export const fetchStatistiqueAdmin = async (token) => {
  const response = await fetch(`/api/admin/statistiques`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  
  const data = await response.json();
  
  if (!response.ok) {
      throw new Error(data.message);
  }
  return await data;
};

export const fetchStatistiqueLibrarian= async (token) => {
  const response = await fetch(`/api/librarian/statistiques`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  
  const data = await response.json();
  
  if (!response.ok) {
      throw new Error(data.message);
  }
  return await data;
};