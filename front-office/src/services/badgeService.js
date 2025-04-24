export const fetchBadge = async ( token = null, searchItem = '' ) => {
    let response = null;
    if (token) {
        response = await fetch(`/api/badge?search=${encodeURIComponent(searchItem)}`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    } else {
        response = await fetch(`/api/badge`, {
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
    console.log(data);
    
    const response = await fetch('/api/badge', {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
    

    const result = await response.json();

    if (result.errors) {
        return {
            errors: result.errors,
            message: result?.message || '',
    }

    } else if (!response.ok) {
        throw new Error(result.message ?? result.errors);                      
    }
    
    return {
        errors: '',
        message: result.message,
    }
}


export const ResestBadge = async ( token, badgeId ) => {

    const response = await fetch(`/api/badge/${badgeId}`, {
        method: 'delete',
        headers: {
            Authorization: `Bearer ${token}`
        },
    });
    

    const result = await response.json();

    if (result.errors) {
        return {
            errors: result.errors,
            message: result?.message || '',
        }

    } else if (!response.ok) {
        throw new Error(result.message ?? result.errors);                      
    }
    
    return {
        errors: '',
        message: result.message,
    }
}

