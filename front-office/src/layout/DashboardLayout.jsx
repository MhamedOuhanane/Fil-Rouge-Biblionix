import { Outlet } from "react-router-dom";
import DashboardHeader from "../components/Headers/responsable/DashboardHeader";
import Sidebar from "../components/Headers/responsable/Sidebar";
import { useRedirectByRole } from "../hooks/useRedirectByRole";

const DashboardLayout = ({ role }) => {
    useRedirectByRole(['admin']);
    return (
        <> 
            <div className="flex h-screen">
                <Sidebar />
    
                <div className="flex-1 w-full md:ml-20 overflow-hidden">
                    <DashboardHeader title={role} />
                    <main className="mt-20 md:mt-0 px-2 md:px-4 bg-[#F9E6D7]">
                        <Outlet />
                    </main>
                </div>
            </div>
        </>
    )
}

export default DashboardLayout;