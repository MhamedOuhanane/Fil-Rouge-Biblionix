const DeletedButton = ({ element, handleAction }) => {
    return (
        <button
            onClick={() => handleAction(element)}
            className="bg-red-500 hover:bg-red-600 text-white text-xs px-4 py-2 rounded-md"
        >
            <i className="fa-solid fa-trash fa-lg" ></i>
        </button>
    )
}

export default DeletedButton;