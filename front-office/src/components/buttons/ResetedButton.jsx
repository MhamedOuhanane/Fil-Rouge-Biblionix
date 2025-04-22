
const ResetedButton = ({ element, handleAction }) => {
    return (
        <button
            onClick={() => handleAction(element)}
            className="bg-blue-500 hover:bg-blue-600 text-white text-xs px-4 py-2 rounded-md"
        >
            <i className="fa-solid fa-arrows-rotate" ></i>
        </button>
    )
}

export default ResetedButton;