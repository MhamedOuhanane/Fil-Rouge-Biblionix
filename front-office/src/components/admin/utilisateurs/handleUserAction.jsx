import Swal from "sweetalert2";

export const handleActivate = async (token, user, updateUser, fetchData, status) => {
    const stringStatus = {
        'Active': ["Activer", "activé"],
        'Suspendu': ["Suspendre", "suspendu"],
        'Ban': ["Bannir", "banni"],
    };
    const result = await Swal.fire({
        icon: "info",
        title: `${stringStatus[status][0]} l'utilisateur`,
        text: `Voulez-vous ${stringStatus[status][0]} le compte de ${user.first_name} ${user.last_name} ?`,
        showCancelButton: true,
        confirmButtonText: `Oui, ${stringStatus[status][0]}`,
        cancelButtonText: "Annuler",
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
    });

    if (result.isConfirmed) {
        try {
        await updateUser(token, user, status);
        await Swal.fire({
            icon: "success",
            title: `Utilisateur ${stringStatus[status][1]} `,
            text: `Le compte de ${user.first_name} ${user.last_name} a été ${stringStatus[status][1]}.`,
            showConfirmButton: false,
            timer: 1500,
            timerProgressBar: true,
        });
        fetchData();
        } catch (error) {
        await Swal.fire({
            icon: "error",
            title: "Erreur",
            text: error.message,
            confirmButtonText: "Réessayer",
            confirmButtonColor: "#d33",
        });
        }
    }
};