import { Outlet } from "react-router-dom";
import BiblionixHeader from "../components/Headers/Header";
import Footer from "../components/footer/Footer";

export default function Layout() {
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