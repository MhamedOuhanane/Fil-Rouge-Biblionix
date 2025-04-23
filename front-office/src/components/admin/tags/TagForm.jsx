import React, { useState } from "react";
import Swal from "sweetalert2";
import useToken from "../../../store/useToken";
import { createTag, updateTag } from "../../../services/tagService";

const TagForm = ({ setShowModal, tagToEdit, onSuccess }) => {
    const { token } = useToken();
    const [tags, setTags] = useState(
        tagToEdit ? [{ id: tagToEdit.id, name: tagToEdit.name }] : [{ name: "" }]
    );
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errors, setErrors] = useState({});

    const isEditMode = !!tagToEdit;

    const handleChange = (e, index) => {
        const updated = [...tags];
        updated[index].name = e.target.value;
        setTags(updated);
    };

    const addTagField = () => {
        setTags([...tags, { name: "" }]);
    };

    const removeTagField = (index) => {
        const updated = [...tags];
        updated.splice(index, 1);
        setTags(updated);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
    try {
        let response;
        if (tagToEdit) {
            response = await updateTag(token, tags[0].id, tags[0].name);
        } else {
            response = await createTag(token, tags);
        }
        

        if (response.errors) {
            setErrors(response.errors);
            return;
        }

        await Swal.fire({
            icon: "success",
            title: tagToEdit ? "Modifier Tag" : "Create Tag",
            text: response.message,
            confirmButtonText: "Confirm",
            confirmButtonColor: "#3085d6",
            timer: 1200,
            timerProgressBar: true,
        });

        setShowModal(false);
        onSuccess();
        } catch (error) {
        await Swal.fire({
            icon: "error",
            title: tagToEdit ? 'Update Failed' : "Creation Failed",
            text: error.message || "An error occurred",
            confirmButtonText: "Retry",
            confirmButtonColor: "#d33",
        });
        } finally {
        setIsSubmitting(false);
        }
    };

    const styleInput = (error) => {
        return error ? "border-red-300 focus:ring-red-500" : "border-gray-300 focus:ring-blue-500";
    } 
    const messageErreur = (error) => {
    return error && <p className="mt-1 text-xs text-red-500">{error}</p>
    }
    console.log(errors[`name.${0}`]);
    
    
  return (
    <form onSubmit={handleSubmit} className="p-4 max-w-md mx-auto">
      {tags.map((tag, index) => (
        <div>
            <div key={index} className="flex  space-x-2 mb-2">
                <input
                    type="text"
                    value={tag.name}
                    onChange={(e) => handleChange(e, index)}
                    placeholder={`Tag #${index + 1}`}
                    className={`w-full px-3 py-2 border rounded-md text-sm ${styleInput(errors[`name.${index}`])}`}
                />
                {!isEditMode && tags.length > 1 && (
                    <button
                    type="button"
                    onClick={() => removeTagField(index)}
                    className="text-red-500 text-sm"
                    >
                    ✕
                    </button>
                )}
            </div>
            {messageErreur(errors[`name.${index}`])}
        </div>
      ))}

      {!isEditMode && (
        <button
          type="button"
          onClick={addTagField}
          className="text-blue-500 text-sm mb-4"
        >
          + Ajouter un champ
        </button>
      )}

      <div className="flex justify-end space-x-2">
        <button
          type="button"
          onClick={() => setShowModal(false)}
          className="text-white bg-red-400 py-2 px-4 rounded-md text-xs md:text-sm font-medium hover:bg-red-500"
        >
          Annuler
        </button>

        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-amber-800 text-white py-2 px-4 rounded-md text-xs md:text-sm font-medium hover:bg-amber-900"
        >
          {isSubmitting ? "Envoi..." : isEditMode ? "Modifier" : "Enregistrer"}
        </button>
      </div>
    </form>
  );
};

export default TagForm;
