import * as Yup from "yup";

const BadgeValidation = Yup.object().shape({
    title: Yup.string().required("Le titre est requis"),
    content: Yup.string().required("La description est requise")
        .min(80, "La description doit contenir au moins 80 caractères"),
    prix: Yup.number().required("Le prix est requis")
        .typeError("Le prix doit être un nombre")
        .min(0, "Le prix ne peut pas être négatif")
        .required("Le prix est requis"),
    reservation: Yup.number().required("Le reservation est requis")
        .typeError("Le nombre de réservations doit être un nombre")
        .integer("Le nombre de réservations doit être un entier")
        .min(0, "Le nombre de réservations ne peut pas être négatif")
        .max(10, "Le nombre de réservations ne peut pas être suppérieur à 10")
        .required("Le nombre de réservations est requis"),
    duration: Yup.number().required("Le duration est requis")
        .typeError("La durée doit être un nombre")
        .integer("La durée doit être un entier")
        .min(1, "La durée doit être au moins d4un jour")
        .required("La durée est requise"),
    prolongation: Yup.number().required("Le prolongation est requis")
        .integer("Le nombre de prolongement doit être un entier")
        .min(0, "Le nombre de prolongement ne peut pas être négatif"),
});

export default BadgeValidation;

