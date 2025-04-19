import { useEffect, useState } from "react"
import { BadgeIcon, ContactIcon, EmailIcon, PhoneIcon } from "../../Icons/Icons"
import { Link, useLocation } from "react-router-dom"
import SubscriptionPopup from "../Subscription/SubscriptionPopup";
import useToken from "../../store/useToken";
import LogoutButton from "../Auth/Logout";
import Avatar from "../Profiles/Avatar";

function Navbar() {
  const { pathname } = useLocation();
  const [isPopupOpen, setIsPopupOpen] = useState(false)
  const {token, decodeToken, user} = useToken();
  const isLoggedIn = !!token;
  
  useEffect (() => {
    decodeToken();
  }, []);
  console.log(user);
  
  

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
        <div className="flex items-center space-x-4 text-sm md:text-md text-[#8B4513]">
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
                <Avatar user={user} />
                <Link to={'/Contact'} >
                  <ContactIcon />
                </Link>
                <button onClick={togglePopup}>
                  <BadgeIcon />
                </button>
                <LogoutButton />
              </>
            )
          }
        </div>
      </div>

      {/* Popup d'abonnement */}
      <SubscriptionPopup isOpen={isPopupOpen} onClose={() => setIsPopupOpen(false)} isLoggedIn={isLoggedIn} />
    </>
  )
}

export default Navbar
