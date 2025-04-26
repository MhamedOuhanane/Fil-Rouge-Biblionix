
const SuspendreButton = ({ element, handleAction, status =  "Suspendu" }) => {
    return (
        <button
            onClick={() => handleAction(element, status)}
            className="text-xl"
        >
            ⛔
        </button>
    )
}

export default SuspendreButton;