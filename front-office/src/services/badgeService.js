import Swal from "sweetalert2";

export const fetchBadge = async ({ token, searchItem = '' }) => {
    try {
        const response = await fetch(`api/badge?search=${encodeURIComponent(searchItem)}`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        const data = await response.json();

        if (response.status == 404) {
            return {
                badges: [],
                message: data.message,
            }
        } else if (!response.ok) {
            Swal.fire({
                icon: 'error',
                title: 'Erreur de récupération',
                text: data.message || 'Une erreur est survenue lors de la récupération des badges.',
                confirmButtonText: "Réssayer",
                confirmButtonColor: 'red',
            })
            return {
                badges: [],
                message: data.message,
            }
        } 
        return {
            badges: data.badges,
            message: data.message,
        }
    } catch (error) {
        Swal.fire({
            icon: 'error',
            title: 'Erreur de récupération',
            text: error.message,
            confirmButtonColor: 'red',
            confirmButtonText: 'Réssayer',
        })
        return {
            badges: [],
            message: error.message,
        }
    }
}