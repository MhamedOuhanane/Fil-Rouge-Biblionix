import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ReaderIcon, UserPlusIcon, WriterIcon } from '../../Icons/Icons';
import Swal from 'sweetalert2';

function SignupForm() {
  const [userType, setUserType] = useState('lecteur');
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    password_confirmation: '',
    role: 'lecteur'
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  // Handle user type selection
  const handleUserTypeChange = (type) => {
    setUserType(type);
    setFormData(prevState => ({
      ...prevState,
      role: type
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Form validation
    // if (!formData.first_name || !formData.last_name || !formData.email || !formData.password) {
    //   setErrors("Veuillez remplir tous les champs obligatoires.");
    //   return;
    // }
    
    // if (formData.password !== formData.password_confirmation) {
    //   setErrors("Les mots de passe ne correspondent pas.");
    //   return;
    // }
    
    
    try {
      setLoading(true);
      setErrors({});
      
      const response = await fetch('/api/register', {
        method: 'POST',
        body: JSON.stringify(formData),
      });
      
      const data = await response.json();
      
         if (data.errors) {
            setErrors(data.errors);
        } else if (!response.ok) {
            Swal.fire({
                icon: 'error',
                title: 'Erreur d\'inscription',
                text: data.message || data.errors || "Une erreur s'est produite, veuillez réessayer.",
                color: 'red',
                confirmButtonText: 'Réessayer',
                confirmButtonColor: '#d33',
              });
        } else {
            Swal.fire({
                icon: 'success',
                title: 'Inscription réussie !',
                text: 'Vous pouvez maintenant vous connecter.',
                color: 'green',
                confirmButtonText: 'Confermé',
                confirmButtonColor: '#28a745',
            }).then((result) => {
                if (result.isConfirmed) {
                    window.location.href = '/login';
                }
            });
        } 
      
    } catch (err) {
        Swal.fire({
            icon: 'error',
            title: 'Erreur d\'inscription: ',
            text: err,
            color: 'red',
            confirmButtonText: 'Réessayer',
            confirmButtonColor: '#d33',
          });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center py-10 bg-[#FDF2E9]">
      <div className="mb-6">
        <div className="p-3 rounded-lg bg-amber-700 w-16 h-16 flex items-center justify-center mx-auto">
          <UserPlusIcon color="white" size={30} />
        </div>
      </div>
      
      <h2 className="text-2xl md:text-2xl font-bold mb-8 text-black">Créez votre compte</h2>
      
      
      <form onSubmit={handleSubmit} className="bg-[#FCE3C9] rounded-lg shadow-md p-6 md:p-8 w-full  max-w-md">
        {/* User type selection */}
        <div className="flex justify-center mb-6 gap-4">
          <button
            type="button"
            className={`px-4 py-2 rounded-md flex items-center gap-2 ${userType === 'lecteur' ? 'bg-amber-100 border border-amber-700' : 'bg-amber-50 border border-gray-300'}`}
            onClick={() => handleUserTypeChange('lecteur')}
          >
            <ReaderIcon size={18} />
            <span>Lecteur</span>
          </button>
          <button
            type="button"
            className={`px-4 py-2 rounded-md flex items-center gap-2 ${userType === 'auteur' ? 'bg-amber-100 border border-amber-700' : 'bg-amber-50 border border-gray-300'}`}
            onClick={() => handleUserTypeChange('auteur')}
          >
            <WriterIcon size={18} />
            <span>Écrivain</span>
          </button>
        </div>
        
        {/* Form fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block mb-1 text-gray-700 font-serif">Prénom</label>
            <input
              type="text"
              name="first_name"
              placeholder="Prénom"
              value={formData.first_name}
              onChange={handleChange}
              className="w-full p-2 border-gray-400 border-2 rounded-md bg-[#FCE3C9]"
              required
            />
            
            {errors.first_name && <p className="text-red-500">{errors.first_name}</p>}
            
          </div>
          <div>
            <label className="block mb-1 text-gray-700 font-serif">Nom</label>
            <input
              type="text"
              name="last_name"
              placeholder="Nom"
              value={formData.last_name}
              onChange={handleChange}
              className="w-full p-2 border-gray-400 border-2 rounded-md bg-[#FCE3C9]"
              required
            />
            {errors.last_name && <p className="text-red-500">{errors.last_name}</p>}
          </div>
        </div>
        
        <div className="mb-4">
          <label className="block mb-1 text-gray-700 font-serif">Adresse e-mail</label>
          <input
            type="email"
            name="email"
            placeholder="Entrez votre e-mail"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 border-gray-400 border-2 rounded-md bg-[#FCE3C9]"
            required
          />
          
            {errors.email && <p className="text-red-500">{errors.email}</p>}
        </div>
        
        <div className="mb-4">
          <label className="block mb-1 text-gray-700 font-serif">Mot de passe</label>
          <input
            type="password"
            name="password"
            placeholder="Entrez le mot de passe"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-2 border-gray-400 border-2 rounded-md bg-[#FCE3C9]"
            required
          />
          
            {errors.password && <p className="text-red-500">{errors.password}</p>}
        </div>
        
        <div className="mb-6">
          <label className="block mb-1 text-gray-700 font-serif">Confirmer le mot de passe</label>
          <input
            type="password"
            name="password_confirmation"
            placeholder="Confirmer le mot de passe"
            value={formData.password_confirmation}
            onChange={handleChange}
            className="w-full p-2 border-gray-400 border-2 rounded-md bg-[#FCE3C9]"
            required
          />
          
            {errors.password_confirmation && <p className="text-red-500">{errors.password_confirmation}</p>}
        </div>
        
        <button
          type="submit"
          className="w-full p-3 rounded-md font-medium text-white bg-[#8B4513] font-serif flex justify-center items-center"
          disabled={loading}
        >
          {loading ? (
            <span className="flex items-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Inscription en cours...
            </span>
          ) : "Créer un compte"}
        </button>
        
        <div className="text-center mt-4">
          <span className="text-gray-600">Vous avez déjà un compte? </span>
          <Link to="/login" className="text-[#8B4513] font-medium font-serif">Se connecter</Link>
        </div>
      </form>
    </div>
  );
}

export default SignupForm;