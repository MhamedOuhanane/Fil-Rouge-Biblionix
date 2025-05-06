import React from "react"
import useToken from "../../../store/useToken";

const PlanBadge = ({
  key,
  badge: BadgeCard, 
  icon,
  styleBadge,
  selectedPlan,
  isLoggedIn,
  email,
  setEmail,
  error,
  utilisateur,
  onSelect,
  onSubmitEmail,
  onSubscripte
}) => { 
  const { badge } = useToken();
  const isSelected = selectedPlan?.title && selectedPlan?.title.toLowerCase() === BadgeCard.title.toLowerCase();

  return (
    <div key={key} className={`w-72 rounded-xl p-5 flex flex-col text-white ${styleBadge} shadow-md`}>
      <div className="flex items-center gap-2 mb-3">
        <div className="text-xl">{icon}</div>
        <h3 className="text-lg font-bold">{BadgeCard.title.toUpperCase()}</h3>
      </div>

      <div className="bg-white text-gray-800 rounded-full py-2 px-4 flex items-baseline mb-5">
        <h2 className="text-2xl font-bold m-0">{BadgeCard.prix} €</h2>
        <p className="text-sm text-gray-500 ml-1">/Month</p>
      </div>

      <ul className="list-none p-0 m-0 mb-5 flex-grow">
        <li className="mb-2 text-sm">✓ Accès à la bibliothèque de base</li>
        <li className="mb-2 text-sm">✓ 📚 { BadgeCard.reservation } livres maximum par mois</li>
        <li className="mb-2 text-sm">✓ ⏳ Durée d'emprunt : { BadgeCard.duration } jours</li>
        <li className="mb-2 text-sm">✓ 🔁 { BadgeCard.prolongation } prolongations possibles</li>
      </ul>

      {isSelected && !isLoggedIn ? (
        <form onSubmit={(e) => onSubmitEmail(e, selectedPlan)} className="w-full">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Votre email"
            className="w-full p-2 rounded border text-gray-800"
            required
          />
          {error.email && <p className="mt-1 text-xs text-red-500">{error.email}</p>}
          {( badge?.title !== BadgeCard.title) && 
            <button
              type="submit"
              onClick={() => onSubscripte(utilisateur?.id, BadgeCard)}
              className="w-full mt-2 border-2 rounded-full py-2 px-4 text-sm font-bold border-[#F9E6D7] hover:bg-[#F9E6D7] hover:text-[#6B4423] transition-all"
            >
              CONTINUER
            </button>
          }
        </form>
      ) : ((badge?.title !== BadgeCard.title) ? ( 
            <button
              onClick={() => onSelect(BadgeCard)}
              className="self-center border-2 rounded-full py-2 px-4 text-sm font-bold border-[#F9E6D7] hover:bg-[#F9E6D7] hover:text-[#6B4423] transition-all"
            >
              CHOISISSEZ
            </button>
        ) : (
          <span
            className="self-center border-2 rounded-full py-2 px-4 text-sm font-bold border-emerald-600 text-emerald-600"
          >
            Active
          </span>
        )
      )}
    </div>
  )
}

export default PlanBadge
