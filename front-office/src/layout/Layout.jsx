import { Outlet } from "react-router-dom";
import BiblionixHeader from "../components/Headers/Header";
import Footer from "../components/Footer/Footer";

export default function Layout() {
    return (
        <>
            <BiblionixHeader />
            <main className="mt-24 px-8 md:px-16">
                <Outlet />
            </main>
            <Footer />
        </>
    )
}