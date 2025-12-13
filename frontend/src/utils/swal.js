import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import swalStyles from "../styles/Swal.module.css";

const MySwal = withReactContent(Swal);

const customSwalClasses = {
    popup: swalStyles["custom-swal"],
    htmlContainer: swalStyles["custom-swal-content"],
    icon: swalStyles["custom-swal-icon"],
    title: swalStyles["custom-swal-title"],
    confirmButton: swalStyles["custom-swal-confirm"],
    actions: swalStyles["custom-swal-actions"]
}

export const showSuccessSwal = (text = "", callback = null) => {
    MySwal.fire({
        icon: "success",
        title: "Success",
        text,
        confirmButtonText: "Close",
        confirmButtonColor: "#2ECC71",
        customClass: customSwalClasses,
        allowOutsideClick: false,
    }).then(() => {
        if (callback) callback();
    });
};