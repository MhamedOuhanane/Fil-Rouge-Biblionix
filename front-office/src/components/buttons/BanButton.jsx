
const BanButton = ({ element, handleAction,  status = "Ban" }) => {
    return (
        <button
            onClick={() => handleAction(element,  status)}
            className="text-xl"
        >
            🚫
        </button>
    )
}

export default BanButton;