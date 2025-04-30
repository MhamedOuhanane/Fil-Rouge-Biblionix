
export const fetchSuccess = async (token, payerId) => {
    
    const response = await fetch(`/api/subscription/success?subscription_id=${encodeURIComponent(payerId)}`, {
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


export const fetchCancel = async (token, payerId) => {
    
    const response = await fetch(`/api/subscription/cancel?subscription_id=${encodeURIComponent(payerId)}`, {
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