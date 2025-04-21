import * as Yup from "yup";

const BadgeValidation = Yup.object().shape({
    title: Yup.string().required("Le titre est requis"),
    content: Yup.string().required("La description est requise")
        .min(100, "La description doit contenir au moins 100 caractères"),
    prix: Yup.number()
        .typeError("Le prix doit être un nombre")
        .min(0, "Le prix ne peut pas être négatif")
        .required("Le prix est requis"),
    reservation: Yup.number()
        .typeError("Le nombre de réservations doit être un nombre")
        .integer("Le nombre de réservations doit être un entier")
        .min(0, "Le nombre de réservations ne peut pas être négatif")
        .required("Le nombre de réservations est requis"),
    duration: Yup.number()
        .typeError("La durée doit être un nombre")
        .integer("La durée doit être un entier")
        .min(1, "La durée doit être au moins d’un jour")
        .required("La durée est requise"),
    prolongation: Yup.number()
        .integer("Le nombre de prolongement doit être un entier")
        .min(0, "Le nombre de prolongement ne peut pas être négatif"),
});

export default BadgeValidation;

