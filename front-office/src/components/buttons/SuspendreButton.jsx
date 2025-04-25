
const SuspendreButton = ({ element, handleAction }) => {
    return (
        <button
            onClick={() => handleAction(element)}
            className="text-xl"
        >
            ⛔
        </button>
    )
}

export default SuspendreButton;