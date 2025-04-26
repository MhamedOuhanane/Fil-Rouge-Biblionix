
const DemotionButton = ({ element, handleAction }) => {
    return (
        <button
            onClick={() => handleAction(element, "Démotion")}
            className="text-xl"
        >
            ⬇️
        </button>
    )
}

export default DemotionButton;