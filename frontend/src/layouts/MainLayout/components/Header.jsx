import { useSelector } from "react-redux";
import styles from "./Header.module.css";

const Header = ({ title }) => {
    const user = useSelector((state) => state.user);
    return (
        <div className={styles["header"]}>
            <span className={styles["span-username"]}>Hello, {user?.username || "Guest"}</span>
            <span className={styles["span-page-title"]}>{title}</span>
        </div>
    );
};

export default Header;
