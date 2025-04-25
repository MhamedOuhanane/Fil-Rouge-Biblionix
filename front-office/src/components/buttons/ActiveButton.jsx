
const ActiveButton = ({ element, handleAction, status = "Active" }) => {
    return (
        <button
            onClick={() => handleAction(element, status)}
            className="text-xl"
        >
            ✅
        </button>
    )
}

export default ActiveButton;