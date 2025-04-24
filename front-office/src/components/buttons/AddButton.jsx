
const AddButton = ({ title, handleAddClick }) => {
    return (
        <button
            className="bg-amber-800 text-white text-[0.6rem] md:text-lg px-4 py-2 rounded-lg ml-4 hover:bg-amber-900"
            onClick={handleAddClick}
        >
            ➕ {title}
        </button>
    )
}

export default AddButton;