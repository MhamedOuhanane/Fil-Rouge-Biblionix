import React from "react"

const ButtonBurgerMenu = ({toggleMenu, isOpen, className}) => {
    return (
        <button
            className={`md:hidden z-20 p-1 text-gray-800 bg-inherit ${className}`}
            onClick={toggleMenu}
        >
            <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8"
            fill="none"
            stroke="#8B4513"
            strokeWidth="2"
            viewBox="0 0 24 24"
            strokeLinecap="round"
            strokeLinejoin="round"
            >
                
            <path className={!isOpen ? '' : 'hidden'} d="M4 6h16M4 12h16M4 18h16" />
            <path className={isOpen ? '' : 'hidden'} d="M6 18L18 6M6 6l12 12" />
            </svg>
        </button>
    )
}

export default ButtonBurgerMenu;