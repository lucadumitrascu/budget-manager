import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PERIOD_OPTIONS } from "../../../utils/constants";
import { setExpensesAction } from "../../../redux/slices/expensesSlice";
import { setIncomesAction } from "../../../redux/slices/incomesSlice";
import styles from "./Header.module.css";

const Header = ({ title }) => {
    const user = useSelector((state) => state.user);
    const [period, setPeriod] = useState(localStorage.getItem("selectedPeriod") || "last30");
    const dispatch = useDispatch();

    const handleChange = (e) => {
        const value = e.target.value;
        setPeriod(value);
        localStorage.setItem("selectedPeriod", value);
        dispatch(setExpensesAction([]));
        dispatch(setIncomesAction([]));
    };

    return (
        <div className={styles["header"]}>
            <div className={styles["div-left"]}>
                <span className={styles["span-username"]}>Hello, {user?.username || "Guest"}</span>
            </div>

            <div className={styles["div-right"]}>
                <select id="select-period" className={styles["period-selector"]} value={period} onChange={handleChange}>
                    {PERIOD_OPTIONS.map((p) => (
                        <option key={p.value} value={p.value}>
                            {p.label}
                        </option>
                    ))}
                </select>
                <span className={styles["span-page-title"]}>{title}</span>
            </div>
        </div>
    );
};

export default Header;

