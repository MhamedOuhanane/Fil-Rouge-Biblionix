import Swal from "sweetalert2";

export const loadingSwal = (message = '') => {
    return Swal.fire({
        title: "Loading...",
        text: `${message}, please wait...`,
        allowOutsideClick: false,
        color: "#78350f",
        didOpen: () => {
            Swal.showLoading();
        },
    });
}