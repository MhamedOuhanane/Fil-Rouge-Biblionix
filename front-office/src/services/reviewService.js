
export const createReview = async (token, formData) => {    
    try {
        const response = await fetch('/api/review', {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        });

        const data = await response.json();

        if (data.errors) {
            return {
                errors: data.errors,
                message: data?.message || '',
            }
        }

        if (!response.ok) {
            throw new Error(data.message);
        }

        return await data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}


export const fetchRevies = async ( token, review_On, review_By, created_at, page = 1) => {
    try {
        
        const response = await fetch(`/api/review?review_On${encodeURIComponent(review_On)}&review_By=${encodeURIComponent(review_By)}&created_at=${encodeURIComponent(created_at)}&page=${encodeURIComponent(page)}`, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            }
        });

        const data = await response.json();
        if (response.ok || response.status === 404) {
            return  await data;
        } else {
            throw new Error(data.message || "Erreur lors de la récupération des reviews");
        }
    } catch (error) {
        console.error(error);
        throw error; 
    }
}