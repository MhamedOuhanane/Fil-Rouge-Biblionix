import { useNavigate } from "react-router-dom";


export const SelecteFilter = ({ title, valueInisial = "", values = [], handleAction, className = "" }) => {
    const capitalizeFirstLetter = (str) => {        
        if (!str) return str;
        return str.charAt(0).toUpperCase() + str.slice(1);
    };
    
    return (
        <select
              value={valueInisial}
              onChange={(e) => handleAction(e.target.value)}
              className="border border-[#A0522D] rounded px-3 py-2 text-[#A0522D] focus:outline-none focus:ring-2 focus:ring-[#A0522D]"
            >
            <option className={`${className} text-lg`}  value="">{title}</option>
            {values && values.map((value) => {
                return <option key={value} className={className} value={value}>{capitalizeFirstLetter(value)}</option>
            })}
        </select>
    )
}

export const SelecteFilterId = ({ title, valueInisial = "", values = [], handleAction, className = "" }) => {
   return (
        <select
              value={valueInisial}
              onChange={(e) => handleAction(e.target.value)}
              className="border border-[#A0522D] rounded px-3 py-2 text-[#A0522D] focus:outline-none focus:ring-2 focus:ring-[#A0522D]"
            >
            <option className={`${className} text-lg`}  value="">{title}</option>
            {values && values.map((value) => {
                return <option key={value.id} className={className} value={value.id}>{value?.name ?? value?.title}</option>
            })}
        </select>
    )
}

export const SelecteCategorie = ({ title = "Tous les Catégories", valueInisial = "", values = [], className = "" }) => {
    const navigate = useNavigate();
    return (
        <select
              value={valueInisial}
              onChange={(e) => navigate(e.target.value ? `/library/${e.target.value}/livres` : '/library/livres')}
              className="border border-[#A0522D] rounded px-3 py-2 text-[#A0522D] focus:outline-none focus:ring-2 focus:ring-[#A0522D]"
            >
            <option className={`${className} text-lg`} value="">{title}</option>
            {values && values.map((value) => {
                return <option key={value.id} className={className} value={value.id}>{value.title}</option>
            })}
        </select>
    )
}

export const SelectTime = ({ valueInisial = "", handleAction, className = "" }) => {
    return (
        <select
              value={valueInisial}
              onChange={(e) => handleAction(e.target.value)}
              className="border border-[#A0522D] rounded px-3 py-2 text-[#A0522D] focus:outline-none focus:ring-2 focus:ring-[#A0522D]"
            >
            <option className={`${className} text-lg`} value="">🕒 Créé le</option>
            <option className={className} value={0}>Aujourd'hui</option>
            <option className={className} value={1}>Hier</option>
            <option className={className} value={7}>Les 7 derniers jours</option>
            <option className={className} value={30}>Les 30 derniers jours</option>
        </select>
    )
}
