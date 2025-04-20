import { Outlet } from "react-router-dom";
import DashboardHeader from "../components/Headers/responsable/DashboardHeader";

const DashboardLayout = () => {
    return (
        <>
            <DashboardHeader />
            <main className="mt-30 md:mt-25 px-8 md:px-16">
                <Outlet />
            </main>
        </>
    )
}

export default DashboardHeader;