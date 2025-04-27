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
    console.log(data);
  
    return await data;
  };