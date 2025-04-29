import { Outlet } from "react-router-dom";
import BiblionixHeader from "../components/Headers/client/Header";
import Footer from "../components/Footer/Footer";
import { useRedirectByRole } from "../hooks/useRedirectByRole";

export default function Layout() {
    

    useRedirectByRole(['visiteur', 'auteur', 'lecteur']);
    return (
        <>
            <BiblionixHeader />
            <main className="mt-30 md:mt-25">
                <Outlet />
            </main>
            <Footer />
        </>
    )
}