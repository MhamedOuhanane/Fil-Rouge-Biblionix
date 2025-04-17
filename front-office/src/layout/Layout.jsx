import { Outlet } from "react-router-dom";
import BiblionixHeader from "../components/Headers/Header";

export default function Layout() {
    return (
        <>
            <BiblionixHeader />
            <main className="mt-24">
                <Outlet />
            </main>
        </>
    )
}