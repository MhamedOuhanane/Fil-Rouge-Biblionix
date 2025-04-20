// import { Bell } from "lucide-react"
import { useMediaQuery } from "react-responsive";
import useToken from "../../../store/useToken"
import LogoutButton from "../../Auth/Logout";
import Avatar from "../../Profiles/Avatar";

const DashboardHeader = () => {
    const { user } = useToken();
    const isDesktop = useMediaQuery({ minWidth: 768 });

  return (
    <header className="bg-white border-b border-amber-300 shadow-sm">
      <div className="flex justify-between items-center p-4">
        <h1 className="text-xl font-semibold text-amber-800">Dashboard</h1>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <Avatar user={user} size="w-8 h-8"/>
            {isDesktop && (
                <div>
                    <p className="text-sm font-medium text-amber-800">{user.userName}</p>
                    <p className="text-xs text-amber-700">{user.role == 'admin' ? 'Admin' : 'Librarian'}</p>
                </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}

export default DashboardHeader
