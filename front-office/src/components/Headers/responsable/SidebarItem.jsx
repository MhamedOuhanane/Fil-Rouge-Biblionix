import { NavLink } from "react-router-dom";

const SidebarItem = ({ icon, text, to, isOpen }) => {
    return (
      <NavLink
        to={to}
        className={({ isActive }) =>
          `flex md:w-full items-center md:gap-3 px-2 md:px-4 py-3 text-sm rounded ${
            isActive
              ? "bg-amber-800 text-white"
              : "text-amber-200 hover:bg-amber-800 hover:text-white"
          }`
        }
      >
        {icon}
        {(isOpen) && <span>{text}</span>}
      </NavLink>
    );
  };
  
  export default SidebarItem;