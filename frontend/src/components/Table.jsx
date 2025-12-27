import { useState } from "react";
import { FaSortUp, FaSortDown } from "react-icons/fa";
import styles from "./Table.module.css";

const Table = ({
    data,
    columns,
    onEdit,
    onDelete,
    expandableKeys = [],
    noDataText = "No data available.",
    tableClassName = "",
}) => {
    const [expandedRows, setExpandedRows] = useState({});
    const [sortConfig, setSortConfig] = useState({ key: "createdAt", direction: "desc" });
    const [visibleItems, setVisibleItems] = useState(50);

    const toggleRow = (id) => {
        setExpandedRows((prev) => ({ ...prev, [id]: !prev[id] }));
    };

    const handleSort = (key) => {
        setSortConfig((prev) => ({
            key,
            direction: prev.key === key && prev.direction === "asc" ? "desc" : "asc",
        }));
    };

    const sortData = (a, b) => {
        const { key, direction } = sortConfig;
        const aVal = a[key];
        const bVal = b[key];

        if (aVal == null) return 1;
        if (bVal == null) return -1;

        if (key === "createdAt") {
            return direction === "asc" ? new Date(aVal) - new Date(bVal) : new Date(bVal) - new Date(aVal);
        }

        if (typeof aVal === "string") {
            return direction === "asc" ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
        }

        if (typeof aVal === "number") {
            return direction === "asc" ? aVal - bVal : bVal - aVal;
        }

        return 0;
    };

    const sortedData = [...data].sort(sortData);
    const visibleData = sortedData.slice(0, visibleItems);

    const handleScroll = (e) => {
        const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
        if (scrollTop + clientHeight >= scrollHeight - 50 && visibleItems < sortedData.length) {
            setVisibleItems((prev) => Math.min(prev + 50, sortedData.length));
        }
    };

    return (
        <div className={styles["div-table"]} onScroll={handleScroll}>
            <table className={`${styles["table"]} ${styles[tableClassName] || ""}`}>
                <thead>
                    <tr>
                        <th>#</th>
                        {columns.map((col) => (
                            <th key={col.key}
                                onClick={col.sortable ? () => handleSort(col.key) : null}
                                style={{ cursor: col.sortable ? "pointer" : "default" }}
                            >
                                {col.label}
                                {sortConfig.key === col.key &&
                                    (sortConfig.direction === "asc" ? (
                                        <FaSortUp />
                                    ) : (
                                        <FaSortDown />
                                    ))}
                            </th>
                        ))}
                        <th>Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {visibleData.length === 0 ? (
                        <tr>
                            <td colSpan={columns.length + 2}>
                                {noDataText}
                            </td>
                        </tr>
                    ) : (
                        visibleData.map((item, index) => {
                            const rowId = item.id;
                            const isExpanded = expandedRows[rowId];

                            return (
                                <tr key={rowId}>
                                    <td>{index + 1}</td>

                                    {columns.map((col) => {
                                        const isExpandable = expandableKeys.includes(col.key);

                                        return (
                                            <td key={col.key}
                                                className={isExpandable && isExpanded ? styles["expanded"] : ""}
                                                onClick={isExpandable ? () => toggleRow(rowId) : null}
                                                title={isExpandable ? "Click to expand" : ""}
                                            >
                                                {col.key === "amount" ? item[col.key].toFixed(2)
                                                    : item[col.key] ?? (col.key === "description" ? "No description provided" : "-")
                                                }
                                            </td>
                                        );
                                    })}

                                    <td>
                                        <button className={styles["btn-edit"]} onClick={() => onEdit(item)}>
                                            Edit
                                        </button>
                                        <button className={styles["btn-delete"]} onClick={() => onDelete(item)} >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            );
                        })
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default Table;
