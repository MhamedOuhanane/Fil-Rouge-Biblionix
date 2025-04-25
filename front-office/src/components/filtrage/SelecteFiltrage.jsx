const SelecteFilter = ({ title, valueInisial = "", values = [], handleAction, className = "" }) => {
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
            <option className={className} value="">{title}</option>
            {values && values.map((value) => {
                return <option key={value} className={className} value={value}>{capitalizeFirstLetter(value)}</option>
            })}
        </select>
    )
}

export default SelecteFilter;