import { toast } from "react-toastify";
import styles from "../styles/Toast.module.css";

export const showSuccessToast = (message) => {
    toast["success"](message, { ...config });
};

export const showInfoToast = (message) => {
    toast["info"](message, { ...config });
};

const config = {
    position: "bottom-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    closeButton: false,
    className: styles["toast"],
};