import React, { useState } from 'react';
import Swal from 'sweetalert2';
import useToken from '../../store/useToken';
import { useRedirectByRole } from '../../hooks/useRedirectByRole';
import { Link } from 'react-router-dom';
import { SpinnerLoadingIcon } from '../../Icons/Icons';

function LoginForm() {
  const { TokenDecode, setToken } = useToken();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  useRedirectByRole(['visiteur']);
  
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault();   
    
    try {
      setLoading(true);
      setErrors({});
      
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          "Content-type": 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      const data = await response.json();
      
        if (data.errors) {
            setErrors(data.errors);
        } else if (!response.ok) {  
            setFormData(prev => ({
                ...prev,
                password: ''
            }));  

            Swal.fire({
                icon: 'error',
                title: 'Erreur de connexion',
                text: data.message || data.errors || data.error || "Une erreur lour de la connexion, veuillez réessayer.",
                // color: 'red',
                confirmButtonText: 'Réssayer',
                confirmButtonColor: 'red',
              });
        } else {
            Swal.fire({
                icon: 'success',
                title: 'Connexion réussie !',
                text: data.message,
                color: 'green',
                confirmButtonText: 'Confermé',
                confirmButtonColor: 'green',
                allowOutsideClick: false,
            }).then((result) => {
                if (result.isConfirmed) {
                  setToken(data.token);
                }
            });
        } 
      
    } catch (err) {
        Swal.fire({
            icon: 'error',
            title: 'Erreur de connexion: ',
            text: err,
            color: 'red',
            confirmButtonText: 'Réssayer',
            confirmButtonColor: 'red',
          });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center mb-2 py-10">
        
        <h2 className="text-1xl md:text-2xl font-bold my-8 text-black">Connectez-vous à votre compte</h2>
        
        
        <form onSubmit={handleSubmit} className="bg-[#FCE3C9] rounded-lg shadow-md p-6 md:p-8 w-full  max-w-md">
            
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
              {/* <Link to="reset-password" className='text-sm'>Mot de passe oublié?</Link> */}
            </div>
            
            <button
            type="submit"
            className="w-full p-3 rounded-md font-medium text-white bg-[#8B4513] font-serif flex justify-center items-center"
            disabled={loading}
            >
              {loading ? (
                  <span className="flex items-center">
                  <SpinnerLoadingIcon />
                  Connexion en cours...
                  </span>
              ) : "Se connecter"}
            </button>
            
            <div className="text-center mt-4">
            <span className="text-gray-600">Vous n'avez pas de compte ? </span>
            <Link to="/register" className="text-[#8B4513] font-medium font-serif"> Inscrivez-vous</Link>
            </div>
        </form>
    </div>
  );
}

export default LoginForm;