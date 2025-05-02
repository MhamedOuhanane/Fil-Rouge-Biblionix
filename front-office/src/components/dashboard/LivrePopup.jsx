import { useEffect, useState } from "react";
import LivreValidation from "../../validations/LivreValidation";
import useToken from "../../store/useToken";
import { createLivre } from "../../services/LivreService";
import Swal from "sweetalert2";

const LivrePopup = ({ show, onClose, categories, tags, initialData, isEditMode }) => {
    const { user, token } = useToken();
    const initialFormData = {
        title: "",
        summary: "",
        photo: null,
        author: user.role === 'auteur' ? user.userName : "",
        quantity: 0,
        categorie_id: "",
        disponibilite: "",
        tags: [],
    }
    
    const [formData, setFormData] = useState(initialFormData);
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (isEditMode && initialData) {
            setFormData({
                title: initialData.title || "",
                summary: initialData.summary || "",
                photo: null,
                author: initialData.author || "",
                quantity: initialData.quantity || "",
                categorie_id: initialData.categorie_id || "",
                disponibilite: initialData.disponibilite || "",
                tags: initialData.tags || [],
            });
        }
    }, [isEditMode, initialData]);
    
    const validationForm = async () => {
        try {
            await LivreValidation.validate(formData, { abortEarly: false });
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

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === "photo") {
            setFormData((prev) => ({ ...prev, photo: files[0] }));
        } else {
            setFormData((prev) => ({ ...prev, [name]: value }));
        }
    };

    const handleSelectChange = (name, value) => {
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleTagsChange = (e) => {
        const selectedTags = Array.from(e.target.selectedOptions, (option) => parseInt(option.value));
        setFormData((prev) => ({ ...prev, tags: selectedTags }));
    };

    const handleSubmit = async (e) => {
            e.preventDefault()
            setIsSubmitting(true)
            const isValid = await validationForm();
            console.log(isValid);
            
            if (!isValid && !isEditMode) {
                setIsSubmitting(false);
                return;
            }
            try {
                setErrors({});
                const formPayload = new FormData();

                Object.entries(formData).forEach(([key, value]) => {
                    if (Array.isArray(value)) {
                        value.forEach((v, i) => formPayload.append(`${key}[${i}]`, v));
                    } else {
                        formPayload.append(key, value);
                    }
                });
                console.log(formPayload);
                
                const { errors, message } = await createLivre( token, formPayload )
                if (errors) {
                    setErrors(errors);
                    return;
                }
                Swal.fire({
                    icon: 'success',
                    title: 'Ajout confirmé',
                    text: message,
                    color: 'green',
                    showConfirmButton: false,
                    timer: 1200,
                    timerProgressBar: true,
                })
                setFormData(initialFormData);
                onClose();
    
            } catch (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Échec de l’ajout du livre',
                    text: error.message,
                    color: 'red',
                    confirmButtonText: 'Réessayer',
                    confirmButtonColor: 'red',
                }); 
            } finally {
                setIsSubmitting(false);
            }
        }
        
        if (!show) return null;
    

    return (
        <div className={`fixed inset-0 bg-[#8b4513b8] flex items-center justify-center ${user?.role?.name === 'auteur' ? 'mt-24' : ''}`}>
            <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-3xl">
                <h2 className="text-2xl font-bold text-[#8B4513] mb-4">{isEditMode ? "Modifier le Livre" : "Ajouter un Livre"}</h2>
                <div className="mb-4">
                    <label className="block text-[#8B4513] mb-2">Titre :</label>
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        className="w-full p-3 rounded-lg border border-[#d4c9b2] focus:outline-none focus:ring-2 focus:ring-[#6b5e48]"
                    />
                    {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title}</p>}
                </div>
                <div className="mb-4">
                    <label className="block text-[#8B4513] mb-2">Résumé :</label>
                    <textarea
                        name="summary"
                        value={formData.summary}
                        onChange={handleChange}
                        className="w-full p-3 rounded-lg border border-[#d4c9b2] focus:outline-none focus:ring-2 focus:ring-[#6b5e48]"
                        rows="4"
                    />
                    {errors.summary && <p className="text-red-500 text-xs mt-1">{errors.summary}</p>}
                </div>
                <div className="flex flex-wrap md:flex-nowrap justify-evenly gap-2">
                    <div className="mb-4 w-full md:w-1/2">
                        <label className="block text-[#8B4513] mb-2">Photo :</label>
                        <input
                            type="file"
                            name="photo"
                            onChange={handleChange}
                            className="w-full p-3 rounded-lg border border-[#d4c9b2] focus:outline-none focus:ring-2 focus:ring-[#6b5e48]"
                        />
                        {errors.photo && <p className="text-red-500 text-xs mt-1">{errors.photo}</p>}
                    </div>
                    <div className="mb-4 w-full md:w-1/2">
                        <label className="block text-[#8B4513] mb-2">Auteur :</label>
                        <input
                            type="text"
                            name="author"
                            value={formData.author}
                            onChange={handleChange}
                            className="w-full p-3 rounded-lg border border-[#d4c9b2] focus:outline-none focus:ring-2 focus:ring-[#6b5e48]"
                        />
                        {errors.author && <p className="text-red-500 text-xs mt-1">{errors.author}</p>}
                    </div>
                </div>
                {user.role === 'librarian' && 
                    <div className="flex flex-wrap md:flex-nowrap justify-evenly gap-2">
                        <div className="mb-4 w-full md:w-1/2">
                            <label className="block text-[#8B4513] mb-2">Quantité :</label>
                            <input
                                type="number"
                                name="quantity"
                                value={formData.quantity}
                                onChange={handleChange}
                                className="w-full p-3 rounded-lg border border-[#d4c9b2] focus:outline-none focus:ring-2 focus:ring-[#6b5e48]"
                            />
                            {errors.quantity && <p className="text-red-500 text-xs mt-1">{errors.quantity}</p>}
                        </div>
                        <div className="mb-4 w-full md:w-1/2">
                            <label className="block text-[#8B4513] mb-2">Disponibilité :</label>
                            <select
                                name="disponibilite"
                                value={formData.disponibilite}
                                onChange={handleChange}
                                className="w-full p-3 rounded-lg border border-[#d4c9b2] focus:outline-none focus:ring-2 focus:ring-[#6b5e48]"
                            >
                                <option value="">Sélectionner une disponibilité</option>
                                <option value="Disponible">Disponible</option>
                                <option value="Rupture de stock">Rupture de stock</option>
                                <option value="Indisponible">Indisponible</option>
                            </select>
                            {errors.disponibilite && <p className="text-red-500 text-xs mt-1">{errors.disponibilite}</p>}
                        </div>
                    </div>
                }
                <div className="flex flex-wrap md:flex-nowrap justify-evenly gap-2">
                    <div className="mb-4 w-full md:w-1/2">
                        <label className="block text-[#8B4513] mb-2">Catégorie :</label>
                        <select
                            name="categorie_id"
                            value={formData.categorie_id}
                            onChange={(e) => handleSelectChange("categorie_id", parseInt(e.target.value))}
                            className="w-full p-3 rounded-lg border border-[#d4c9b2] focus:outline-none focus:ring-2 focus:ring-[#6b5e48]"
                        >
                            <option value="">Sélectionner une catégorie</option>
                            {categories && categories.map((cat) => (
                                <option key={cat.id} value={cat.id}>{cat.title}</option>
                            ))}
                        </select>
                        {errors.categorie_id && <p className="text-red-500 text-xs mt-1">{errors.categorie_id}</p>}
                    </div>
                    <div className="mb-4 w-full md:w-1/2">
                        <label className="block text-[#8B4513] mb-2">Tags :</label>
                        <select
                            multiple
                            name="tags"
                            value={formData.tags}
                            onChange={handleTagsChange}
                            className="w-full p-3 rounded-lg border border-[#d4c9b2] focus:outline-none focus:ring-2 focus:ring-[#6b5e48]"
                        >
                            {tags && tags.map((tag) => (
                                <option key={tag.id} value={tag.id}>{tag.name}</option>
                            ))}
                        </select>
                        {errors.tags && <p className="text-red-500 text-xs mt-1">{errors.tags}</p>}
                    </div>
                </div>
                <div className="flex justify-end gap-2">
                    <button
                        onClick={() => {
                            onClose(); 
                            setFormData(initialFormData)
                            setErrors({});
                        }}
                        className="px-4 py-2 bg-gray-300 text-[#6b5e48] rounded hover:bg-gray-400 transition"
                    >
                        Annuler
                    </button>
                    <button
                        onClick={handleSubmit}
                        className="px-4 py-2 bg-[#6b5e48] text-white rounded hover:bg-[#5a4d3b] transition"
                    >
                        {!isEditMode ? 
                            (isSubmitting ? "Ajouté..." : "Ajouter") :
                            (isSubmitting? "Modifie..." : "Modifier")
                        }
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LivrePopup;