import CategoryLimitInput from "./CategoryLimitInput";
import styles from "./CategoriesSection.module.css";

const CategoriesSection = ({
    categories,
    maxBudget,
    onChange,
}) => {
    return (
        <div
            className={styles["categories-section"]}>
            {categories.length === 0 ? (
                <h2>No categories recorded yet. 📝</h2>
            ) : (
                categories.map((category, index) => (
                    <CategoryLimitInput
                        key={category.id}
                        category={category}
                        index={index}
                        maxBudget={maxBudget}
                        onChange={onChange}
                    />
                ))
            )}
        </div>
    )
}

export default CategoriesSection;