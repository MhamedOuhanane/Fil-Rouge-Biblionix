
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