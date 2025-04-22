import React from "react";
import { ProfileIcon } from "../../Icons/Icons";

const Avatar = ({ user, size = "w-6 h-6", alt = "Utilisateur" }) => {
  
    const photoPath = user?.photo; 
    const BASE_URL = "http://127.0.0.1:8000/storage";
    const photoUrl = photoPath ? `${BASE_URL}/${photoPath}` : null;
    const sizeIcon = ['admin', 'librarien'].includes(user?.role) ? 30 : 24; 
    
    return (
        <>
            {photoUrl ? (
                <img
                src={photoUrl}
                alt={alt}
                className={`${size} rounded-full object-cover shadow`}
                />
            ) : (
                <ProfileIcon size={sizeIcon}/>
            )}
        </>
    );
};

export default Avatar;
