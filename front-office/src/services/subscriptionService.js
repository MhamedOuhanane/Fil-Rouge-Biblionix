
export const fetchSuccess = async (token, payerId) => {
    const response = await fetch(`/api/subscription/success?subscription_id=${payerId}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message);
    }

    return await data;
}