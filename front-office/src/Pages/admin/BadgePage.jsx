import { useState } from "react"

const BadgePage = () => {
  const [badges, setBadges] = useState([
    {
      id: 1,
      title: "Premium Access",
      content: "Access to premium content and features",
      price: 99.99,
      reservations: 5,
      duration: 30,
      prolongation: true,
    },
    {
      id: 2,
      title: "Basic Plan",
      content: "Standard access to basic features",
      price: 29.99,
      reservations: 2,
      duration: 14,
      prolongation: false,
    },
  ])

//   const handleAddBadge = (newBadge) => {
//     setBadges([...badges, newBadge])
//   }

//   const handleRemoveBadge = (badgeId) => {
//     setBadges(badges.filter((badge) => badge.id !== badgeId))
//   }

  return (
    <div className="w-full flex flex-col">
      <div className="p-4 border-b border-gray-200">
        <h1 className="text-lg font-semibold text-gray-800">Badge Management</h1>
        <p className="text-sm text-gray-500">Create and manage your badges</p>
      </div>

      <div className="flex-1 overflow-auto">
      </div>
      
    </div>
  )
}

export default BadgePage;
