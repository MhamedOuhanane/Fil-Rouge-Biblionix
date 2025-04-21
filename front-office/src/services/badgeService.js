import Cookies from 'js-cookie';

export const fetchBadge = async ( searchItem = '' ) => {
    const token = Cookies.get('token');
    let response = null;
    if (token) {
        response = await fetch(`api/badge?search=${encodeURIComponent(searchItem)}`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    } else {
        response = await fetch(`api/badge`, {
            method: 'GET',
        });
    }

    const data = await response.json();

    if (response.status == 404) {
        return {
            badges: [],
            message: data.message,
        }
    } else if (!response.ok) {
        throw new Error(data.message);
    }
    return {
        badges: data.badges,
        message: data.message,
    }
}

export const createBadge = async ( token, data ) => {
    const response = await fetch('api/badge', {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(data),
    });

    const result = await response.json();

    if (result.errors) {
        return {
            errors: result.errors,
            message: '',
        }

    } else if (!response.ok) {
        throw new Error(data.message ?? data.errors);                      
    }
    
    return {
        errors: '',
        message: result.message,
    }
}

