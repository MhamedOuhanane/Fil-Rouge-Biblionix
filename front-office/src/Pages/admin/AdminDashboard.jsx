import useToken from "../../store/useToken"

const AdminDashboard = () => {
    const { user } = useToken();

    return (
        <>
            <h1>Hello to Your Dashboard M.{user.userName}</h1>
        </>
    )
}

export default AdminDashboard;