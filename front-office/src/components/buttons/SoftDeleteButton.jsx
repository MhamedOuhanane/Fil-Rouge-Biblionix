import DeletedButton from "./DeletedButton";
import ResetedButton from "./ResetedButton";

const SoftDeleteButton = ({ element, softDeleteButton }) => {
    
    if (!element) return null;

    return (
        <>
            {element.deleted_at ? (
                <ResetedButton element={element} handleAction={softDeleteButton} />
            ) : (
                <DeletedButton  element={element} handleAction={softDeleteButton} />
            )}
        </>
    )
}

export default SoftDeleteButton;
