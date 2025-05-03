import { Outlet } from "react-router-dom";
import BiblionixHeader from "../components/Headers/client/Header";
import Footer from "../components/Footer/Footer";
import { useRedirectByRole } from "../hooks/useRedirectByRole";
import { useEffect } from "react";
import useToken from "../store/useToken";

export default function Layout() {
    const { getUserFromToken, user, badge, setBadge } = useToken();
    useEffect (() => {
        if (!user) getUserFromToken();
        if (!badge) setBadge();
        console.log(badge);
      }, []);

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