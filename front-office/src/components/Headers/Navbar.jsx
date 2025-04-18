import { useState } from "react"
import { BadgeIcon, EmailIcon, PhoneIcon } from "../../Icons/Icons"
import { Link } from "react-router-dom"

function Navbar() {
  const [isPopupOpen, setIsPopupOpen] = useState(false)

  // Vérifier si l'utilisateur est connecté (à adapter selon votre logique d'authentification)
  // const isLoggedIn = false // Remplacez par votre logique d'authentification

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen)
  }

  return (
    <>
      <div className="flex justify-between items-center h-8 px-8 md:px-16 bg-[#DBC9C0]">
        <div className="flex space-x-4 md:space-x-8 text-sm">
          <div className="flex items-center space-x-1 md:space-x-4">
            <PhoneIcon size={16} />
            <span className="text-[#8B4513] hidden sm:block">+212-617-860000</span>
          </div>
          <div className="flex items-center space-x-1 md:space-x-4">
            <EmailIcon size={16} />
            <span className="text-[#8B4513] hidden sm:block">biblionix06@gmail.com</span>
          </div>
        </div>
        <div className="flex space-x-4 text-sm md:text-md">
          <Link to="/register">Inscription</Link>
          <Link to="/login">Connexion</Link>
          <button onClick={togglePopup}>
            <BadgeIcon />
          </button>
        </div>
      </div>

      {/* Popup d'abonnement */}
      {/* <LogoutButton /> */}
      {/* <SubscriptionPopup isOpen={isPopupOpen} onClose={() => setIsPopupOpen(false)} isLoggedIn={isLoggedIn} /> */}
    </>
  )
}

export default Navbar
