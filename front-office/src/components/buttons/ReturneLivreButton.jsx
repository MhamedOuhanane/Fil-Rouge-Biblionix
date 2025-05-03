const ReturneLivreButton = ({ element, handleAction, returned_at = true }) => {
    return (
        <button
            onClick={() => handleAction(element, "", returned_at)}
            className="text-xl"
        >
            🔁📖
        </button>
    )
}

export default ReturneLivreButton;