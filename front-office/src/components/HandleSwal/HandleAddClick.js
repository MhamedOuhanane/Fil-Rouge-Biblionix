import Swal from "sweetalert2";


const handleAddClick = async ({ title, description, ...props }) => {
    const result = await Swal.fire({
        icon: "info",
        title: "Add New Category",
        text: "You are about to create a new category. Proceed?",
        showCancelButton: true,
        confirmButtonText: "Yes, Proceed",
        cancelButtonText: "Cancel",
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
    });

    if (result.isConfirmed) {
        props;
    }
};

export default handleAddClick;