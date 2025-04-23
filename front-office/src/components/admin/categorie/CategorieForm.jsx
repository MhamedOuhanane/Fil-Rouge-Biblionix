import React, { useState } from "react";
import useToken from "../../../store/useToken";


const CategorieForm = ({ setShowModal, categorieToEdit, onSuccess }) => {
  const { token } = useToken();
  const initialFormState = {
    title: categorieToEdit?.title || "",
    logo: null,
    content: categorieToEdit?.content || "",
  };

  const [formData, setFormData] = useState(initialFormState);

  const styleInput = (error) =>
    error
      ? "border-red-300 focus:ring-red-500"
      : "border-amber-600 focus:ring-amber-800";

  const messageErreur = (error) =>
    error && <p className="mt-1 text-xs text-red-500">{error}</p>;

  return (
    <div className="p-4 border-t border-amber-600">
      <form >
      </form>
    </div>
  );
};

export default CategorieForm;