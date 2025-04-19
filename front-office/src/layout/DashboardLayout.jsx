import { Outlet } from "react-router-dom";
import BiblionixHeader from "../components/Headers/client/Header";
import Footer from "../components/Footer/Footer";

export default function DashboardLayout() {
    return (
        <>
            <BiblionixHeader />
            <main className="mt-30 md:mt-25 px-8 md:px-16">
                <Outlet />
            </main>
            <Footer />
        </>
    )
}