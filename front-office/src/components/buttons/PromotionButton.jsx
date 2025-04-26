const PromotionButton = ({ element, handleAction }) => {
    return (
        <button
            onClick={() => handleAction(element, "Promotion")}
            className="text-xl"
        >
            ⬆️
        </button>
    )
}

export default PromotionButton;