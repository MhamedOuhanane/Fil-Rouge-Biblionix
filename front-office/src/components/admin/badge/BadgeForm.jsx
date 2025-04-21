import { useState } from "react"
import useToken from "../../../store/useToken"
import Swal from "sweetalert2";
import BadgeValidation from "../../../validations";

const BadgeForm = () => {
    const { token } = useToken();
    const initialFormState = {
        title: "",
        content: "",
        prix: "",
        reservation: "",
        duration: "",
        prolongation: "",
    }

    const [formData, setFormData] = useState(initialFormState)
    const [errors, setErrors] = useState({})
    const [isSubmitting, setIsSubmitting] = useState(false)

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target
        setFormData({
        ...formData,
        [name]: type === "checkbox" ? checked : value,
        })

        // Clear error when field is edited
        if (errors[name]) {
        setErrors({
            ...errors,
            [name]: null,
        })
        }
    }

    const validationForm = async () => {
        try {
            await BadgeValidation.validate(formData, { abortEarly: false });
            setErrors({});
            return true;
        } catch (validationErrors) {
            const formErrors = {};
            validationErrors.inner.forEach((err) => {
            formErrors[err.path] = err.message;
            });
            setErrors(formErrors);
            return false;
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsSubmitting(true)

        if (validationForm()) {
            try {
                setErrors({})

                const response = await fetch('api/badge', {
                    method: 'POST',
                    headers: {
                        Authorization: `Bearer ${token}`
                    },
                    body: JSON.stringify(formData),
                });

                const data = await response.json();

                if (data.errors) {
                    setErrors(data.errors);
                } else if (!response.ok) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Échec de l’ajout du badge',
                        text: data.message || data.errors || "Une erreur lour de l'ajout du badge, veuillez réessayer.",
                        color: 'red',
                        confirmButtonText: 'Réessayer',
                        confirmButtonColor: 'red',
                    });                        
                } else {
                    Swal.fire({
                        icon: 'success',
                        title: 'Ajout confirmé',
                        text: data.message,
                        color: 'green',
                        confirmButtonText: 'Confirmer',
                        confirmButtonColor: 'green',
                    }); 
                }
            } catch (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Échec de l’ajout du badge',
                    text: error,
                    color: 'red',
                    confirmButtonText: 'Réessayer',
                    confirmButtonColor: 'red',
                }); 
            }
        }  
        setIsSubmitting(false)
    }

    const styleInput = (error) => {
        return error ? "border-red-300 focus:ring-red-500" : "border-gray-300 focus:ring-blue-500";
    } 
    const messageErreur = (error) => {
        return error && <p className="mt-1 text-xs text-red-500">{error}</p>
    }

    return (
        <div className="p-4 border-t border-gray-200">
        <h2 className="text-sm font-semibold mb-3 text-gray-700">Create New Badge</h2>
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
            <label htmlFor="title" className="block text-xs font-medium text-gray-700 mb-1">
                Title
            </label>
            <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className={`w-full px-3 py-2 text-sm border rounded-md focus:outline-none focus:ring-1 ${styleInput(errors.title)}`}
            />
            {messageErreur(errors.title)}
            </div>

            <div className="mb-3">
            <label htmlFor="content" className="block text-xs font-medium text-gray-700 mb-1">
                Content
            </label>
            <textarea
                id="content"
                name="content"
                value={formData.content}
                onChange={handleChange}
                rows="2"
                className={`w-full px-3 py-2 text-sm border rounded-md focus:outline-none focus:ring-1 ${styleInput(errors.content)}`}
            ></textarea>
            {messageErreur(errors.content)}
            </div>

            <div className="grid grid-cols-2 gap-3 mb-3">
            <div>
                <label htmlFor="prix" className="block text-xs font-medium text-gray-700 mb-1">
                prix ($)
                </label>
                <input
                type="number"
                id="prix"
                name="prix"
                value={formData.prix}
                onChange={handleChange}
                min="0"
                step="0.01"
                className={`w-full px-3 py-2 text-sm border rounded-md focus:outline-none focus:ring-1 ${styleInput(errors.prix)}`}
                />
                {messageErreur(errors.prix)}
            </div>

            <div>
                <label htmlFor="reservations" className="block text-xs font-medium text-gray-700 mb-1">
                Reservations
                </label>
                <input
                type="number"
                id="reservations"
                name="reservations"
                value={formData.reservation}
                onChange={handleChange}
                min="0"
                className={`w-full px-3 py-2 text-sm border rounded-md focus:outline-none focus:ring-1 ${errors.reservation}`}
                />
                {messageErreur(errors.reservation)}
            </div>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-3">
            <div>
                <label htmlFor="duration" className="block text-xs font-medium text-gray-700 mb-1">
                Duration (days)
                </label>
                <input
                type="number"
                id="duration"
                name="duration"
                value={formData.duration}
                onChange={handleChange}
                min="1"
                className={`w-full px-3 py-2 text-sm border rounded-md focus:outline-none focus:ring-1 ${styleInput(errors.duration)}`}
                />
                {messageErreur(errors.duration)}
            </div>

            <div className="flex items-end mb-1">
                <div className="flex items-center h-10">
                    <label htmlFor="prolongation" className="ml-2 block text-xs font-medium text-gray-700">
                        Number de Prolongation
                    </label>
                    <input
                        type="number"
                        id="prolongation"
                        name="prolongation"
                        checked={formData.prolongation}
                        onChange={handleChange}
                        className={`w-full px-3 py-2 text-sm border rounded-md focus:outline-none focus:ring-1 ${styleInput(errors.prolongation)}`}
                    />
                    {messageErreur(errors.prolongation)}
                </div>
            </div>
            </div>

            <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md text-sm font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
            {isSubmitting ? "Creating..." : "Create Badge"}
            </button>
        </form>
        </div>
    )
}

export default BadgeForm
