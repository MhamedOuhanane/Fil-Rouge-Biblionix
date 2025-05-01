import * as Yup from "yup";

const LivreValidation = Yup.object().shape({
    title: Yup.string()
        .required("Le titre est requis"),
    summary: Yup.string()
        .required("Le résumé est requis")
        .min(50, "Le résumé doit contenir au moins 50 caractères"),
    photo: Yup.mixed()
        .required("La photo est requise"),
    author: Yup.string()
        .required("L'auteur est requis"),
    categorie_id: Yup.number()
        .required("La catégorie est requise")
        .integer("L'ID de la catégorie doit être un entier"),
    tags: Yup.array()
});

export default LivreValidation;