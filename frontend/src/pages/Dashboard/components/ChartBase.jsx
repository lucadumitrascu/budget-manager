import styles from "./ChartBase.module.css";

const ChartBase = ({
    title,
    paddingTop = false,
    children
}) => {
    return (
        <div className={styles["chart"]}>
            <div className={styles["chart-title"]}>{title}</div>
            <div className={styles["chart-container"]} style={!paddingTop ? { paddingTop: 0 } : {}}>
                {children}
            </div>
        </div>
    );
};

export default ChartBase;
