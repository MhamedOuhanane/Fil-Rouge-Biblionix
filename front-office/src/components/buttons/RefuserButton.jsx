const RefuserButton = ({ element, handleAction, status = "Refuser" }) => {
    return (
        <button
            onClick={() => handleAction(element, status)}
            className="text-xl"
        >
            ❌
        </button>
    )
}

export default RefuserButton;