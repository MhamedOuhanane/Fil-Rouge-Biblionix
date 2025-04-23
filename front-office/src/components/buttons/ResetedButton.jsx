
const ResetedButton = ({ element, handleAction }) => {
    return (
        <button
            onClick={() => handleAction(element)}
            className="text-xl"
        >
            🔄
        </button>
    )
}

export default ResetedButton;