import { useEffect, useRef, useState } from "react"
import PlanBadge from "../admin/badges/Badge"
import { fetchBadge } from "../../services/badgeService"
import Swal from "sweetalert2"
import { SpinnerLoadingIcon } from "../../Icons/Icons"
import { getUserEmail } from "../../services/userService"
import { loadingSwal } from "../../utils/loadingSwal"

const SubscriptionPopup = ({ isOpen, onClose, isLoggedIn }) => {
  const popupRef = useRef();
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [email, setEmail] = useState("");
  const [error, setError] = useState({});
  const [utilisateur, setUtilisateur] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [badges, setBadges] = useState(null);
  const Items = { 
    icon: ["🎫", "⚙️", "⭐", "🌐", "📦",],
    style: [
      "bg-gradient-to-b from-[#ff9539] to-[#ffb87a]", 
      "bg-gradient-to-b from-[#ef8325] to-[#e0a26c]",
      "bg-gradient-to-b from-[#d56701] to-[#ffa04c]",
      "bg-gradient-to-b from-[#914510] to-[#e4720f]", 
    ],
  };

  const fetchData = async () => {
    setIsLoading(true);
    try {
        const dataFetch = await fetchBadge();
        setBadges(dataFetch.badges);     
    } catch (error) {
        Swal.fire({
            icon: 'error',
            title: 'Erreur de récupération',
            text: error.message,
            confirmButtonText: 'Réssayer',
            confirmButtonColor: 'red',
        });
    } finally {
        setIsLoading(false);
    }
  };

  

  useEffect(() => {
    if (isOpen) fetchData();
  
    const handleClickOutside = (e) => {
      if (popupRef.current && !popupRef.current.contains(e.target)) {
        onClose();
        setSelectedPlan(null);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside)
    } else {
      setEmail({});
      setEmail("");
      setSelectedPlan(null);
      document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  const handlePlanSelect = (plan) => {
    if (isLoggedIn) {
      console.log(`Abonnement au plan ${plan} confirmé`)
    } else {
      setSelectedPlan(plan)
    }
  }
  
  const getUser = async (email) => {
      loadingSwal("Récupération utilisateur");
  
      try {
        const dataFetch = await getUserEmail(email);

        if (dataFetch.errors) {
          setError(dataFetch.errors);
          loadingSwal().close();
          return;
        }
        setUtilisateur(dataFetch.user);
        loadingSwal().close();
      } catch (error) {
        loadingSwal().close();
        await Swal.fire({
          icon: "error",
          title: "Erreur de récupération",
          text: error.message,
          confirmButtonText: "Réessayer",
          confirmButtonColor: "#d33",
        });
      }
    };

  const handleSubmitEmail = (e) => {
    e.preventDefault();
    getUser(email);
  }

  return (
    <div className="fixed inset-0 bg-[#6b43239b] px-3 flex justify-center items-center z-50 mt-8">
      <div ref={popupRef} className="bg-none z-50 rounded-lg p-6 mx-4 relative max-w-5xl max-h-[90vh] scrollbar-hide overflow-auto">
        <button className="absolute top-0 right-0 text-gray-500 hover:text-gray-700 text-2xl" onClick={onClose}>
          ×
        </button>

        <div className="flex flex-wrap justify-center gap-6 py-4">
          {isLoading ? (
            <div className="selef-conter">
              <SpinnerLoadingIcon size={30} />
            </div>
          ) : (badges && (badges.map((badge, i) => 
            {
              if (badge.title !== 'Gratuit') {
                return (
                  <PlanBadge
                    badge={badge}
                    icon={Items.icon[i]} 
                    styleBadge={Items.style[i]}
                    selectedPlan={selectedPlan}
                    isLoggedIn={isLoggedIn}
                    email={email}
                    setEmail={setEmail}
                    error={error}
                    onSelect={handlePlanSelect}
                    onSubmitEmail={handleSubmitEmail}
                  />
                )
             }  
            }
          )))}
        </div>
      </div>
    </div>
  )
}

export default SubscriptionPopup
