import { ToastContainer } from "react-toastify";
import VerticalNavbar from "./components/VerticalNavbar";
import Header from "./components/Header";
import styles from "./MainLayout.module.css";

const MainLayout = ({ title, children }) => {
    return (
        <div className={styles["main-layout"]}>
            <VerticalNavbar />

            <div className={styles["page-container"]}>
                <Header title={title} />
                <div className={styles["page-content"]}>
                    {children}
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};


export default MainLayout;
