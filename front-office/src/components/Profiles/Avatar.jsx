import React from "react";
import { useMediaQuery } from "react-responsive";
import { ProfileIcon } from "../../Icons/Icons";

const Avatar = ({ user, size = "w-6 h-6", alt = "Utilisateur" }) => {
  
    const photoPath = user?.photo; 
    const BASE_URL = "http://127.0.0.1:8000/storage/photos/";
    const photoUrl = photoPath ? `${BASE_URL}/${photoPath}` : null;
    const isDesktop = useMediaQuery({ minWidth: 768 });


    return (
        <div className="flex items-center space-x-2">
        {photoUrl ? (
            <img
            src={photoUrl}
            alt={alt}
            className={`${size} rounded-full object-cover shadow`}
            />
        ) : (
            <ProfileIcon />
        )}
        {isDesktop && <span>{user?.userName || user?.role || "User"}</span> }
        </div>
    );
};

export default Avatar;
