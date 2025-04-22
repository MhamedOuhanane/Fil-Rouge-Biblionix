

const UpdatedButton = ({ element, handleAction }) => {
    return (
        <button
            onClick={() => handleAction(element)}
            className="bg-green-500 hover:bg-green-600 text-white text-xs px-4 py-2 rounded-md"
        >
            <i className="fa-solid fa-pen-to-square fa-lg" ></i>
        </button>
    )
}

export default UpdatedButton;