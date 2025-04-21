import useToken from "../../store/useToken"

const AdminDashboard = () => {
    const { user } = useToken();

    return (
        <>
            <div className="px-4 py-3 border-b border-[#8B4513] md:text-start text-center w-full">
                <h1 className="text-lg font-semibold text-gray-800">Table de Bord</h1>
                <p className="text-sm text-gray-500">Afficher les statistique du site avec les diagramme</p>
            </div>
        </>
    )
}

export default AdminDashboard;