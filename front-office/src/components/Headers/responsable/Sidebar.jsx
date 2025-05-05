import { useEffect, useState } from 'react';
import SidebarItem from './SidebarItem';
import { BadgeIcon, BiblionixLogo, BookIcon, CategoryIcon, ContactIcon, MessageIcon, PaymentIcon, ReservationIcon, ReviewIcon, TableBordIcon, TagsIcon, UtilisateurIcon } from '../../../Icons/Icons';
import LogoutButton from '../../Auth/Logout';
import useToken from '../../../store/useToken';
import { useMediaQuery } from 'react-responsive';

const Sidebar = () => {
    const { user } = useToken();
    const [isOpen, setIsOpen] = useState(false);
    const isDesktop = useMediaQuery({ minWidth: 768 });
   
    useEffect (() => {
        if (!isDesktop && isOpen)  setIsOpen(false); 
    }, [isDesktop])  
    

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div
        className={`fixed top-0 left-0 z-50 mt-12 md:mt-0 h-20 md:h-full transition-all duration-300 ${isOpen && isDesktop ? 'w-64' : 'w-20'} ${!isDesktop && 'w-full'}`}
        >
        <div className={`bg-amber-900 text-white flex md:flex-col h-20 md:h-full`}>
            {isDesktop && (
                <div className="p-4 flex items-center gap-2 border-b border-amber-800">
                    <BiblionixLogo strokeColor={"#F9E6D7"} />
                    <h1 className={`text-xl font-bold ${!isOpen && 'hidden'}`}>Biblionix</h1>
                </div>
            )}
            <div className='w-full'>
                {isDesktop && (
                    <button
                    onClick={toggleSidebar}
                    className="absolute right-0 transform -translate-y-1/2 bg-amber-900 text-white p-2 rounded-l-md"
                    >
                    {isOpen ? '→' : '←'} 
                    </button>
                )}

                <nav className="md:mt-6 flex h-full justify-evenly items-center md:items-start md:justify-start md:flex-col md:flex-1">
                    {user?.role == 'admin' && (
                        <>
                            {isDesktop && (
                                <>
                                    <SidebarItem icon={<TableBordIcon size={28}/>} text="Tableau de Bord" to="/admin" isOpen={isOpen} />
                                    <SidebarItem icon={<UtilisateurIcon />} text="User Management" to="/admin/user" isOpen={isOpen} />
                                </>
                            )}
                            <SidebarItem icon={<CategoryIcon />} text="Categories" to="/admin/categorie" isOpen={isOpen} />
                            <SidebarItem icon={<TagsIcon />} text="Tags" to="/admin/tag" isOpen={isOpen} />
                            {!isDesktop && (
                                <>
                                    <SidebarItem icon={<UtilisateurIcon />} text="User Management" to="/admin/user" isOpen={isOpen} />
                                    <SidebarItem icon={<TableBordIcon />} text="Tableau de Bord" to="/admin" isOpen={isOpen} />
                                </>    
                            )}
                            <SidebarItem icon={<BadgeIcon size={24} />} text="Badges" to="/admin/badge" isOpen={isOpen} />
                            <SidebarItem icon={<PaymentIcon />} text="Payments" to="/admin/transaction" isOpen={isOpen} />
                        </>
                    )}
                    {user?.role == 'librarian' && (
                        <>
                            <SidebarItem icon={<TableBordIcon />} text="Tableau de Bord" to="/librarian" isOpen={isOpen} />
                            <SidebarItem icon={<BookIcon />} text="Livres" to="/librarian/livre" isOpen={isOpen} />
                            <SidebarItem icon={<ReservationIcon />} text="Réservation" to="/librarian/reservation" isOpen={isOpen} />
                            <SidebarItem icon={<ReviewIcon />} text="Reviews" to="/librarian/review" isOpen={isOpen} />
                        </>
                    )}
                </nav>

               {isDesktop && (
                    <div className="absolute w-full bottom-0 border-t border-amber-800">
                        <LogoutButton isOpen={isOpen} dashboard={true}/>
                    </div>
               )}
            </div>
        </div>
        </div>
    );
};

export default Sidebar;
