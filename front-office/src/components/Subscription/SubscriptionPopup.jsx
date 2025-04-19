import { useState } from "react"

const SubscriptionPopup = ({ isOpen, onClose, isLoggedIn }) => {
  const [selectedPlan, setSelectedPlan] = useState(null)
  const [email, setEmail] = useState("")

  if (!isOpen) return null

  const handlePlanSelect = (plan) => {
    if (isLoggedIn) {
      // Si l'utilisateur est connecté, procéder directement à l'abonnement
      console.log(`Abonnement au plan ${plan} confirmé`)
    } else {
      // Si l'utilisateur n'est pas connecté, afficher le champ email
      setSelectedPlan(plan)
    }
  }

  const handleSubmitEmail = (e, plan) => {
    e.preventDefault()
    console.log(`Email ${email} soumis pour le plan ${plan}`)
    // Ici vous pourriez rediriger vers une page d'inscription ou de connexion
    // avec l'email pré-rempli et le plan sélectionné
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 px-3 flex justify-center items-center z-50 mt-8">
      <div className="bg-inherit rounded-lg p-6 mx-4 relative max-w-5xl max-h-[90vh] overflow-auto">
        <button className="absolute top-2 right-3 text-gray-500 hover:text-gray-700 text-2xl" onClick={onClose}>
          ×
        </button>
        <div className="flex flex-wrap justify-center gap-6 py-4">
          {/* BASIC PLAN */}
          <div className="w-72  rounded-xl p-5 flex flex-col text-white bg-gradient-to-b from-[#F4A460] to-orange-300 shadow-md">
            <div className="flex items-center gap-2 mb-3">
              <div className="text-xl">⚙️</div>
              <h3 className="text-lg font-bold">BASIC</h3>
            </div>
            <div className="bg-white text-gray-800 rounded-full py-2 px-4 flex items-baseline mb-5">
              <h2 className="text-2xl font-bold m-0">19.99$</h2>
              <p className="text-sm text-gray-500 ml-1">/Month</p>
            </div>
            <ul className="list-none p-0 m-0 mb-5 flex-grow">
              <li className="mb-2 text-sm">✓ Accès à la bibliothèque de base</li>
              <li className="mb-2 text-sm">✓ Téléchargement limité</li>
              <li className="mb-2 text-sm">✓ Support par email</li>
              <li className="mb-2 text-sm">✓ Mises à jour mensuelles</li>
            </ul>

            {selectedPlan === "basic" && !isLoggedIn ? (
              <form onSubmit={(e) => handleSubmitEmail(e, "basic")} className="w-full">
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
                  className="w-full border-2 border-white rounded-full py-2 px-4 text-sm font-bold hover:bg-white hover:bg-opacity-20 transition-all"
                >
                  CONTINUER
                </button>
              </form>
            ) : (
              <button
                onClick={() => handlePlanSelect("basic")}
                className="self-center border-2 border-white rounded-full py-2 px-4 text-sm font-bold hover:bg-white hover:bg-opacity-20 transition-all"
              >
                START NOW
              </button>
            )}
          </div>

          {/* STANDARD PLAN */}
          <div className="w-72 rounded-xl p-5 flex flex-col text-white bg-gradient-to-b from-[#8B4513] to-orange-400 shadow-md">
            <div className="flex items-center gap-2 mb-3">
              <div className="text-xl">⭐</div>
              <h3 className="text-lg font-bold">STANDARD</h3>
            </div>
            <div className="bg-white text-gray-800 rounded-full py-2 px-4 flex items-baseline mb-5">
              <h2 className="text-2xl font-bold m-0">25.99$</h2>
              <p className="text-sm text-gray-500 ml-1">/Month</p>
            </div>
            <ul className="list-none p-0 m-0 mb-5 flex-grow">
              <li className="mb-2 text-sm">✓ Tout ce qui est inclus dans Basic</li>
              <li className="mb-2 text-sm">✓ Téléchargements illimités</li>
              <li className="mb-2 text-sm">✓ Support prioritaire</li>
              <li className="mb-2 text-sm">✓ Accès aux archives</li>
              <li className="mb-2 text-sm">✓ Fonctionnalités exclusives</li>
            </ul>

            {selectedPlan === "standard" && !isLoggedIn ? (
              <form onSubmit={(e) => handleSubmitEmail(e, "standard")} className="w-full">
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
                  className="w-full border-2 border-white rounded-full py-2 px-4 text-sm font-bold hover:bg-white hover:bg-opacity-20 transition-all"
                >
                  CONTINUER
                </button>
              </form>
            ) : (
              <button
                onClick={() => handlePlanSelect("standard")}
                className="self-center border-2 border-white rounded-full py-2 px-4 text-sm font-bold hover:bg-white hover:bg-opacity-20 transition-all"
              >
                START NOW
              </button>
            )}
          </div>

          {/* PREMIUM PLAN */}
          <div className="w-72 rounded-xl p-5 flex flex-col text-white bg-gradient-to-b from-[#8B5A2B] to-orange-500 shadow-md">
            <div className="flex items-center gap-2 mb-3">
              <div className="text-xl">🌐</div>
              <h3 className="text-lg font-bold">PREMIUM</h3>
            </div>
            <div className="bg-white text-gray-800 rounded-full py-2 px-4 flex items-baseline mb-5">
              <h2 className="text-2xl font-bold m-0">30.99$</h2>
              <p className="text-sm text-gray-500 ml-1">/Month</p>
            </div>
            <ul className="list-none p-0 m-0 mb-5 flex-grow">
              <li className="mb-2 text-sm">✓ Tout ce qui est inclus dans Standard</li>
              <li className="mb-2 text-sm">✓ Accès anticipé aux nouveautés</li>
              <li className="mb-2 text-sm">✓ Support 24/7</li>
              <li className="mb-2 text-sm">✓ Contenu exclusif premium</li>
              <li className="mb-2 text-sm">✓ Personnalisation avancée</li>
              <li className="mb-2 text-sm">✓ Analyse détaillée</li>
            </ul>

            {selectedPlan === "premium" && !isLoggedIn ? (
              <form onSubmit={(e) => handleSubmitEmail(e, "premium")} className="w-full">
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
                  className="w-full border-2 border-white rounded-full py-2 px-4 text-sm font-bold hover:bg-white hover:bg-opacity-20 transition-all"
                >
                  CONTINUER
                </button>
              </form>
            ) : (
              <button
                onClick={() => handlePlanSelect("premium")}
                className="self-center border-2 border-white rounded-full py-2 px-4 text-sm font-bold hover:bg-white hover:bg-opacity-20 transition-all"
              >
                START NOW
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default SubscriptionPopup
