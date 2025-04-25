import Swal from "sweetalert2";

export const handleActivate = async (token, user, updateUser, fetchData) => {
    const result = await Swal.fire({
        icon: "info",
        title: "Activer l'utilisateur",
        text: `Voulez-vous activer le compte de ${user.first_name} ${user.last_name} ?`,
        showCancelButton: true,
        confirmButtonText: "Oui, Activer",
        cancelButtonText: "Annuler",
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
    });

    if (result.isConfirmed) {
        try {
        await updateUser(token, user, "Active");
        await Swal.fire({
            icon: "success",
            title: "Utilisateur activé",
            text: `Le compte de ${user.first_name} ${user.last_name} a été activé.`,
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