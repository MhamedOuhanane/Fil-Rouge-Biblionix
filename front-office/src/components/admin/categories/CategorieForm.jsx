import React, { useState } from "react";
import useToken from "../../../store/useToken";
import Swal from "sweetalert2";
import { createCategorie, updateCategorie } from "../../../services/categorieService";


const CategorieForm = ({ setShowModal, categorieToEdit, onSuccess }) => {
  const { token } = useToken();
  const initialFormState = {
    title: categorieToEdit?.title || "",
    logo: null,
    content: categorieToEdit?.content || "",
  };

  const [formData, setFormData] = useState(initialFormState);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDirty, setIsDirty] = useState(false); 

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
    setIsDirty(true); 

    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null,
      });
    }
  };

  const handleCancel = async () => {
    if (isDirty) {
      const result = await Swal.fire({
        icon: "warning",
        title: "Unsaved Changes",
        text: "You have unsaved changes. Are you sure you want to cancel?",
        showCancelButton: true,
        confirmButtonText: "Oui, Annuler",
        cancelButtonText: "Non, Rester",
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
      });

      if (!result.isConfirmed) return;
    }

    setShowModal(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const data = new FormData();
    data.append("title", formData.title);
    if (formData?.logo) data.append("logo", formData.logo);
    data.append("content", formData.content);
    

    try {
      let response;
      if (categorieToEdit) {
        response = await updateCategorie(token, categorieToEdit.id, data);
      } else {
        response = await createCategorie(token, data);
      }
      console.log(response);
      

      if (response.errors) {
        setErrors(response.errors);
        return;
      }

      await Swal.fire({
        icon: "success",
        title: categorieToEdit ? "Category Updated" : "Category Created",
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
        title: categorieToEdit ? "Update Failed" : "Creation Failed",
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

  return (
    <div className="p-4 border-t border-amber-600">
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label
            htmlFor="title"
            className="block text-xs font-medium text-amber-900 mb-1"
          >
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className={`w-full px-3 py-2 text-sm border rounded-md focus:outline-none focus:ring-1 ${styleInput(
              errors.title
            )}`}
          />
          {messageErreur(errors.title)}
        </div>

        <div className="mb-3">
          <label
            htmlFor="logo"
            className="block text-xs font-medium text-amber-900 mb-1"
          >
            Logo (PNG)
          </label>
          <input
            type="file"
            id="logo"
            name="logo"
            accept="image/png"
            onChange={handleChange}
            className={`w-full px-3 py-2 text-sm border rounded-md focus:outline-none focus:ring-1 ${styleInput(
              errors.logo
            )}`}
          />
          {messageErreur(errors.logo)}
          {categorieToEdit && formData?.logo && (
            <p className="text-xs text-amber-700 mt-1">Nouveau Tag</p>
          )}
          {categorieToEdit && !formData?.logo && (
            <p className="text-xs text-amber-700 mt-1">
              Current logo: {categorieToEdit.logo}
            </p>
          )}
        </div>

        <div className="mb-3">
          <label
            htmlFor="content"
            className="block text-xs font-medium text-amber-900 mb-1"
          >
            Content
          </label>
          <textarea
            id="content"
            name="content"
            value={formData.content}
            onChange={handleChange}
            rows="3"
            className={`w-full px-3 py-2 text-sm border rounded-md focus:outline-none focus:ring-1 ${styleInput(
              errors.content
            )}`}
          ></textarea>
          {messageErreur(errors.content)}
        </div>

        <div className="flex space-x-4 justify-center md:justify-end">
          <button
            type="button"
            className="text-white bg-red-400 py-2 px-4 rounded-md text-xs md:text-sm font-medium hover:bg-red-500"
            onClick={handleCancel}
          >
            Annuler
          </button>

          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-amber-800 text-white py-2 px-4 rounded-md text-xs md:text-sm font-medium hover:bg-amber-900 focus:outline-none focus:ring-2 focus:ring-amber-800 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting
              ? "Processing..."
              : categorieToEdit
              ? "Modifier Categorie"
              : "Create Categorie"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CategorieForm;