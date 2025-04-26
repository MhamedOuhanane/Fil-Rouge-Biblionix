import Swal from "sweetalert2";
import loadingSwal from "./loadingSwal";

export const handleSubscription = async (userId, selectedPlan) => {  
  if (!selectedPlan) {
    Swal.fire({
      icon: "warning",
      title: "Sélectionnez un plan",
      text: "Veuillez sélectionner un plan avant de continuer.",
      confirmButtonText: "OK",
      customClass: {
        popup: "rtl-swal",
      },
    });
    return;
  }

  loadingSwal("Création de l'abonnement en cours");

  try {
    const response = await fetch(`/api/subscription/user/${userId}/badge/${selectedPlan.id}/`, {
      method: "GET",
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Échec de la création de l'abonnement.");
    }

    const data = await response.json();

    if (data.success) {
      window.location.href = data.approval_url;
    } else {
      throw new Error("Échec de la création de l'abonnement : données incorrectes.");
    }
  } catch (error) {
    throw new Error(error.message);
  } finally {
    loadingSwal().close();
  }
};

export const handlePaymentSuccess = (details) => {
  Swal.fire({
    icon: "success",
    title: "Abonnement réussi",
    text: `Merci pour votre abonnement ! Détails: ${details.status}`,
  });
};

export const handlePaymentCancel = () => {
  Swal.fire({
    icon: "info",
    title: "Abonnement annulé",
    text: "L'abonnement a été annulé. Vous pouvez essayer à nouveau.",
  });
};