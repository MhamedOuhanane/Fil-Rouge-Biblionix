import { useState } from 'react';
import SidebarItem from './SidebarItem';
import { BiblionixLogo, BookIcon, CategoryIcon, ContactIcon, MessageIcon, PaymentIcon, TableBordIcon, TagsIcon, UtilisateurIcon } from '../../../Icons/Icons';
import LogoutButton from '../../Auth/Logout';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div
      className={`fixed top-0 left-0 z-50 h-full transition-all duration-300 ${isOpen ? 'w-64' : 'w-20'}`}
    >
      <div className={`bg-amber-900 text-white h-full flex flex-col`}>
        <div className="p-4 flex items-center gap-2 border-b border-amber-800">
          <BiblionixLogo strokeColor={"#F9E6D7"} />
          <h1 className={`text-xl font-bold ${!isOpen && 'hidden'}`}>Biblionix</h1>
        </div>
        <div>
            <button
            onClick={toggleSidebar}
            className="absolute right-0 transform -translate-y-1/2 bg-amber-900 text-white p-2 rounded-l-md"
            >
            {isOpen ? '→' : '←'} 
            </button>

            <nav className="mt-6 flex-1">
            <SidebarItem icon={<TableBordIcon />} text="Tableau de Bord" to="/admin" isOpen={isOpen} />
            <SidebarItem icon={<UtilisateurIcon />} text="User Management" to="/admin/users" isOpen={isOpen} />
            <SidebarItem icon={<CategoryIcon />} text="Categories" to="/admin/categories" isOpen={isOpen} />
            <SidebarItem icon={<TagsIcon />} text="Tags" to="/admin/tags" isOpen={isOpen} />
            <SidebarItem icon={<BookIcon />} text="Livres" to="/admin/books" isOpen={isOpen} />
            <SidebarItem icon={<MessageIcon />} text="Messages" to="/admin/messages" isOpen={isOpen} />
            <SidebarItem icon={<PaymentIcon />} text="Payments" to="/admin/payments" isOpen={isOpen} />
            </nav>

            <div className="absolute w-full bottom-0 border-t border-amber-800">
                <LogoutButton isOpen={isOpen} dashboard={true}/>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
