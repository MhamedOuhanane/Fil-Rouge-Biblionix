import { Outlet } from "react-router-dom";
import DashboardHeader from "../components/Headers/responsable/DashboardHeader";
import Sidebar from "../components/Headers/responsable/Sidebar";

const DashboardLayout = () => {
    return (
        <> 
            <div className="flex h-screen">
                <Sidebar />
    
                <div className="flex-1 md:ml-20 overflow-auto">
                    <DashboardHeader />
                    <main className="mt-30 md:mt-25 px-8 md:px-16">
                        <Outlet />
                    </main>
                </div>
            </div>
        </>
    )
}

export default DashboardLayout;