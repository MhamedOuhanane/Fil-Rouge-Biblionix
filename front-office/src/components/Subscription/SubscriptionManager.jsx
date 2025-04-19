import { useState } from "react"
import SubscriptionPopup from "./SubscriptionPopup"

const SubscriptionManager = ({ isLoggedIn = false }) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false)

  const closePopup = () => {
    setIsPopupOpen(false)
  }

  return (
    <div className="relative">
      <SubscriptionPopup isOpen={isPopupOpen} onClose={closePopup} isLoggedIn={isLoggedIn} />
    </div>
  )
}

export default SubscriptionManager
