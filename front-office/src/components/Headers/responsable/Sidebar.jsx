import { useState } from 'react';
import SidebarItem from './SidebarItem';
import { BiblionixLogo, ContactIcon } from '../../../Icons/Icons';
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
          <BiblionixLogo />
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
            <SidebarItem icon={<ContactIcon />} text="Dashboard" to="/admin" isOpen={isOpen} />
            <SidebarItem icon={<ContactIcon />} text="User Management" to="/admin/users" isOpen={isOpen} />
            <SidebarItem icon={<ContactIcon />} text="Content Moderation" to="/admin/content" isOpen={isOpen} />
            <SidebarItem icon={<ContactIcon />} text="Events" to="/admin/events" isOpen={isOpen} />
            <SidebarItem icon={<ContactIcon />} text="Messages" to="/admin/messages" isOpen={isOpen} />
            <SidebarItem icon={<ContactIcon />} text="Payments" to="/admin/payments" isOpen={isOpen} />
            </nav>

            <div className="absolute w-full bottom-0 border-t border-amber-800">
                <SidebarItem icon={<LogoutButton />} text="Log out" to="/logout" isOpen={isOpen} />
            </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
