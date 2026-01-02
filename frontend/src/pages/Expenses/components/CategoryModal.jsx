import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import useError from "../../../hooks/useError";
import { addCategory, updateCategory } from "../../../services/categoryService";
import { addCategoryAction, updateCategoryAction } from "../../../redux/slices/categoriesSlice";
import { updateCategoryInExpensesAction } from "../../../redux/slices/expensesSlice";
import { showInfoToast, showSuccessToast } from "../../../utils/toast";
import { validateUniqueTextField } from "../../../utils/validation";
import ModalForm from "../../../components/ModalForm";
import Input from "../../../components/Input";

const CategoryModal = ({
    isOpen,
    onClose,
    title,
    primaryButtonText,
    category,
    categories,
    token
}) => {
    const dispatch = useDispatch();
    const [categoryName, setCategoryName] = useState("");
    const [error, setError] = useError();

    useEffect(() => {
        setCategoryName(category?.name || "");
    }, [category]);

    const hasChanges = category?.name !== categoryName;

    const handleSubmit = async (e) => {
        e.preventDefault();

        const errorMessage = validateUniqueTextField(categoryName, categories, "category");
        if (errorMessage) {
            setError(errorMessage);
            return;
        }

        let result;
        if (category?.id) {
            const updatedCategory = {
                id: category.id,
                name: categoryName.trim(),
                createdAt: category.createdAt
            };

            if (!hasChanges) {
                showInfoToast("Category is already up-to-date");
                onClose();
                return;
            }

            result = await updateCategory(updatedCategory, token);
            if (result.success) {
                dispatch(updateCategoryAction(updatedCategory));
                dispatch(updateCategoryInExpensesAction({
                    oldCategory: category.name,
                    newCategory: updatedCategory.name
                }));
            }
        } else {
            result = await addCategory(categoryName.trim(), token);
            if (result.success) {
                dispatch(addCategoryAction(result.data));
            }
        }
        if (result.success) {
            showSuccessToast(result.message);
            setCategoryName("");
            setError("");
            onClose();
        } else {
            setError(result.message);
        }
    };

    return (
        <ModalForm
            title={title}
            onSubmit={handleSubmit}
            primaryButton={{ text: primaryButtonText }}
            secondaryButton={{ text: "Cancel", onClick: onClose }}
            isOpen={isOpen}
            error={error}
        >
            <Input
                label="Category" id="category" type="text" placeholder="Category Name..."
                value={categoryName} onChange={(e) => setCategoryName(e.target.value)}
                maxLength={50}
            />
        </ModalForm>
    );
};

export default CategoryModal;
