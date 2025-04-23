import { useState } from "react"
import useToken from "../../../store/useToken"
import Swal from "sweetalert2";
import { createBadge } from "../../../services/badgeService";
import BadgeValidation from "../../../validations/badgeValidation";

const BadgeForm = ({ setShowModal  }) => {
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
        const { name, value } = e.target
        setFormData({
        ...formData,
        [name]: value,
        })
        
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
        const isValid = await validationForm();

        if (!isValid) {
            setIsSubmitting(false);
            
            return;
        }
        try {
            setErrors({})
            const { errors, message } = await createBadge( token, formData )
            
            
            if (errors) {
                setErrors(errors);
                return;
            }

            Swal.fire({
                icon: 'success',
                title: 'Ajout confirmé',
                text: message,
                color: 'green',
                confirmButtonText: 'Confirmer',
                confirmButtonColor: 'green',
            }).then((result) => {
                if (result.isConfirmed) {
                    setShowModal(false);
                    setFormData(initialFormState);
                }
            });

        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Échec de l’ajout du badge',
                text: error.message,
                color: 'red',
                confirmButtonText: 'Réessayer',
                confirmButtonColor: 'red',
            }); 
        } finally {
            setIsSubmitting(false);
        }
    }

    const styleInput = (error) => {
        return error ? "border-red-300 focus:ring-red-500" : "border-gray-300 focus:ring-blue-500";
    } 
    const messageErreur = (error) => {
        return error && <p className="mt-1 text-xs text-red-500">{error}</p>
    }


    return (
        <div className="p-4 border-t border-amber-600"> 
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="title" className="block text-xs font-medium text-amber-900 mb-1"> 
                        Title
                    </label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        className={`w-full px-3 py-2 text-sm border rounded-md focus:outline-none focus:ring-1 ${styleInput(errors.title)} border-amber-500`}  
                    />
                    {messageErreur(errors.title)}
                </div>
    
                <div className="mb-3">
                    <label htmlFor="content" className="block text-xs font-medium text-amber-900 mb-1">
                        Content
                    </label>
                    <textarea
                        id="content"
                        name="content"
                        value={formData.content}
                        onChange={handleChange}
                        rows="2"
                        className={`w-full px-3 py-2 text-sm border rounded-md focus:outline-none focus:ring-1 ${styleInput(errors.content)} border-amber-500`} 
                    ></textarea>
                    {messageErreur(errors.content)}
                </div>
    
                <div className="grid grid-cols-2 gap-3 mb-3">
                    <div>
                        <label htmlFor="prix" className="block text-xs font-medium text-amber-900 mb-1"> 
                            prix (€)
                        </label>
                        <input
                            type="number"
                            id="prix"
                            name="prix"
                            value={formData.prix}
                            onChange={handleChange}
                            min="0"
                            step="0.01"
                            className={`w-full px-3 py-2 text-sm border rounded-md focus:outline-none focus:ring-1 ${styleInput(errors.prix)} border-amber-500`}
                        />
                        {messageErreur(errors.prix)}
                    </div>
    
                    <div>
                        <label htmlFor="reservation" className="block text-xs font-medium text-amber-900 mb-1">
                            Reservation
                        </label>
                        <input
                            type="number"
                            id="reservation"
                            name="reservation"
                            value={formData.reservation}
                            onChange={handleChange}
                            min="0"
                            step="0.01"
                            className={`w-full px-3 py-2 text-sm border rounded-md focus:outline-none focus:ring-1 ${styleInput(errors.reservation)} border-amber-500`}
                        />
                        {messageErreur(errors.reservation)}
                    </div>
                </div>
    
                <div className="grid grid-cols-2 gap-3 mb-3">
                    <div>
                        <label htmlFor="duration" className="block text-xs font-medium text-amber-900 mb-1">
                            Duration (days)
                        </label>
                        <input
                            type="number"
                            id="duration"
                            name="duration"
                            value={formData.duration}
                            onChange={handleChange}
                            min="1"
                            className={`w-full px-3 py-2 text-sm border rounded-md focus:outline-none focus:ring-1 ${styleInput(errors.duration)} border-amber-500`}  
                        />
                        {messageErreur(errors.duration)}
                    </div>
    
                    <div>
                        <div>
                            <label htmlFor="prolongation" className="ml-2 block text-xs font-medium text-amber-900 mb-1">
                                Prolongation
                            </label>
                            <input
                                type="number"
                                id="prolongation"
                                name="prolongation"
                                checked={formData.prolongation}
                                onChange={handleChange}
                                className={`w-full px-3 py-2 text-sm border rounded-md focus:outline-none focus:ring-1 ${styleInput(errors.prolongation)} border-amber-500`} 
                            />
                            {messageErreur(errors.prolongation)}
                        </div>
                    </div>
                </div>
    
                <div className="flex space-x-4 justify-center md:justify-end">
                    <button
                        className="text-white bg-red-400 py-2 px-4 rounded-md text-xs md:text-sm font-medium hover:bg-red-500"
                        onClick={() => setShowModal(false)}
                    >
                        Annuler
                    </button>
    
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="bg-amber-800 text-white py-2 px-4 rounded-md text-xs md:text-sm font-medium hover:bg-amber-900 focus:outline-none focus:ring-2 focus:ring-amber-800 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isSubmitting ? "Creating..." : "Create Badge"}
                    </button>
                </div>
            </form>
        </div>
    );
    
}

export default BadgeForm;
