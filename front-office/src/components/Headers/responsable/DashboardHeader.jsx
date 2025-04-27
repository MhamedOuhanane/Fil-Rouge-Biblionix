// import { Bell } from "lucide-react"
import { useMediaQuery } from "react-responsive";
import useToken from "../../../store/useToken"
import Avatar from "../../Profiles/Avatar";
import LogoutButton from "../../Auth/Logout";
import { BiblionixLogo } from "../../../Icons/Icons";

const DashboardHeader = ({ title }) => {
    const { user } = useToken();
    const isDesktop = useMediaQuery({ minWidth: 768 });

  return (
    <header className="bg-white h-12 md:h-16 border-b border-amber-300 shadow-sm">
        <div className="flex h-full justify-between items-center px-6">
            <h1 className="md:text-xl text-md font-semibold text-amber-800">{title}</h1>
            {!isDesktop && <BiblionixLogo size={60}/>}
            <div className="flex w-auto justify-between items-center gap-2">
                <div className="flex items-center space-x-2 gap-2">
                    <Avatar user={user} size="w-8 h-8"/>
                    {isDesktop ? (
                        <div>
                            <p className="text-sm font-medium text-amber-800">{user?.userName}</p>
                            <p className="text-xs text-amber-700">{user?.role == 'admin' ? 'Admin' : 'Librarian'}</p>
                        </div>
                    ) : <LogoutButton />
                    }
                </div>
            </div>
        </div>
    </header>
  )
}

export default DashboardHeader
