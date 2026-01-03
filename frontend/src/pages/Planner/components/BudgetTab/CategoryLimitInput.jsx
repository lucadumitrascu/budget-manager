import styles from "./CategoryLimitInput.module.css";

const CategoryLimitInput = ({
    category,
    index,
    maxBudget,
    onChange
}) => {
    const handleChange = (value) => {
        onChange(index, Math.max(0, Math.min(maxBudget, value)));
    };

    return (
        <div className={styles["category-limit-input"]}>
            <label htmlFor={`limit-range-${category.id}`} title={category.name}>
                {category.name}
            </label>

            <input
                id={`limit-range-${category.id}`} type="range" min={0} max={maxBudget}
                value={category.monthlyLimit} onChange={(e) => handleChange(Number(e.target.value))}
                className={styles["input-slider"]}
            />

            <input id={`limit-number-${category.id}`} type="number" min={0} max={maxBudget}
                value={category.monthlyLimit} onChange={(e) => handleChange(Number(e.target.value))}
                className={styles["input-number"]}
            />
        </div>
    );
};

export default CategoryLimitInput;
