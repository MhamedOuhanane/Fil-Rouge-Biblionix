import { useEffect, useState } from "react"
import { BadgeIcon, ContactIcon, EmailIcon, PhoneIcon } from "../../../Icons/Icons"
import { Link, useLocation } from "react-router-dom"
import SubscriptionPopup from "../../Subscription/SubscriptionPopup";
import useToken from "../../../store/useToken";
import LogoutButton from "../../Auth/Logout";
import Avatar from "../../Profiles/Avatar";
import { useMediaQuery } from "react-responsive";

function Navbar() {
  const { pathname } = useLocation();
  const [isPopupOpen, setIsPopupOpen] = useState(false)
  const {token, decodeToken, user} = useToken();
  const isLoggedIn = !!token;
  const isDesktop = useMediaQuery({ minWidth: 768 });
  
  useEffect (() => {
    decodeToken();
  }, []);
  
  
  

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen)
  }

  return (
    <>
      <div className="flex justify-between items-center h-8 px-4 md:px-16 bg-[#DBC9C0]">
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
        <div className="flex items-center w-auto space-x-6 md:space-x-4 text-sm md:text-md text-[#8B4513]">
          {!isLoggedIn ? (
              <>
                <Link to="/register" className={`${pathname == '/register' ? 'text-[#CD853F]' : ''}`}>Inscription</Link>
                <Link to="/login" className={`${pathname == '/login' ? 'text-[#CD853F]' : ''}`}>Connexion</Link>
                <button onClick={togglePopup}>
                  <BadgeIcon />
                </button>
              </>
            ) : (
              <>
                <div className="flex items-center  space-x-2">
                  <Avatar />
                  {isDesktop && (
                    <div className="min-w-max">
                      <p className="text-sm font-medium text-amber-800">{user?.userName}</p>
                      <p className="text-xs text-amber-700">{user?.role == 'lecteur' ? 'Lecteur' : 'Auteur'}</p>
                    </div>
                  )}
                </div>

                <button onClick={togglePopup}>
                  <BadgeIcon color="#6B4423"/>
                </button>
                <LogoutButton />
              </>
            )
          }
        </div>
      </div>

      {/* Popup d'abonnement */}
      <SubscriptionPopup isOpen={isPopupOpen} onClose={() => setIsPopupOpen(false)}  isLoggedIn={isLoggedIn} />
    </>
  )
}

export default Navbar
