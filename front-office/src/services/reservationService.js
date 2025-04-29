export const CreateRéservation = async (token, formData) => {
    const response = await fetch("/api/reservation", {
        method: "POST",
        headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
    });

    const data = await response.json();
    if (data.errors) {
      return {
        message: data.message,
        errors: data.errors,
      }
    }

    if (!response.ok) {
        throw new Error(data.message || "Échec de la création du tag");
    }

    return await data;
};