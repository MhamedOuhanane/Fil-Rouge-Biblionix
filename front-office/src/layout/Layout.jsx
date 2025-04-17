import { Outlet } from "react-router-dom";
import Navbar from "../components/Headers/Navbar";

export default function Layout() {
    return (
        <>
            <Navbar />
            <main>
                <Outlet />
            </main>
        </>
    )
}