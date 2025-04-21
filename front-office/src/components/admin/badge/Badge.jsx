import React from "react"

const PlanBadge = ({
  badge, 
  icon,
  styleBadge,
  selectedPlan,
  isLoggedIn,
  email,
  setEmail,
  onSelect,
  onSubmitEmail
}) => {
  const isSelected = selectedPlan == badge.title.toLowerCase();

  return (
    <div className={`w-72 rounded-xl p-5 flex flex-col text-white ${styleBadge} shadow-md`}>
      <div className="flex items-center gap-2 mb-3">
        <div className="text-xl">{icon}</div>
        <h3 className="text-lg font-bold">{badge.title.toUpperCase()}</h3>
      </div>

      <div className="bg-white text-gray-800 rounded-full py-2 px-4 flex items-baseline mb-5">
        <h2 className="text-2xl font-bold m-0">{badge.prix} €</h2>
        <p className="text-sm text-gray-500 ml-1">/Month</p>
      </div>

      <ul className="list-none p-0 m-0 mb-5 flex-grow">
        <li className="mb-2 text-sm">✓ Accès à la bibliothèque de base</li>
        <li className="mb-2 text-sm">✓ { badge.reservation } livres maximum par mois</li>
        <li className="mb-2 text-sm">✓ Support par email</li>
        <li className="mb-2 text-sm">✓ Durée d'emprunt : { badge.duration } jours</li>
        <li className="mb-2 text-sm">✓ { badge.prolongation } prolongations possibles</li>
      </ul>

      {isSelected && !isLoggedIn ? (
        <form onSubmit={(e) => onSubmitEmail(e, badge.title.toLowerCase())} className="w-full">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Votre email"
            className="w-full p-2 mb-2 rounded border text-gray-800"
            required
          />
          <button
            type="submit"
            className="w-full border-2 rounded-full py-2 px-4 text-sm font-bold border-[#F9E6D7] hover:bg-[#F9E6D7] hover:text-[#6B4423] transition-all"
          >
            CONTINUER
          </button>
        </form>
      ) : (
        <button
          onClick={() => onSelect(badge.paypal_plan_id)}
          className="self-center border-2 rounded-full py-2 px-4 text-sm font-bold border-[#F9E6D7] hover:bg-[#F9E6D7] hover:text-[#6B4423] transition-all"
        >
          START NOW
        </button>
      )}
    </div>
  )
}

export default PlanBadge
