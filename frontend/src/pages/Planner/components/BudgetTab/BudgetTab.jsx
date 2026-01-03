import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { updatePlannerSettings } from "../../../../services/plannerService";
import { setPlannerAction } from "../../../../redux/slices/plannerSlice";
import { updateCategoriesLimitsAction } from "../../../../redux/slices/categoriesSlice";
import { showErrorSwal } from "../../../../utils/swal";
import { showSuccessToast, showInfoToast } from "../../../../utils/toast";
import { hasChangesLists } from "../../../../utils/validation";
import BudgetAllocator from "./BudgetAllocator";
import CategoriesSection from "./CategoriesSection";
import SurplusAllocator from "./SurplusAllocator";
import styles from "./BudgetTab.module.css";

const BudgetTab = ({
    currency,
    budget,
    categories = [],
    goals = [],
    planner,
    token
}) => {
    const dispatch = useDispatch();
    const defaultGoalId = () => goals.length > 0 ? goals[0].id : "";
    const [localCategories, setLocalCategories] = useState(categories);
    const [localMonthlyBudget, setLocalMonthlyBudget] = useState(planner.monthlyBudget || 0);
    const [localSelectedGoalId, setLocalSelectedGoalId] = useState(planner.selectedGoalId || defaultGoalId());

    useEffect(() => {
        setLocalCategories(categories);
        setLocalMonthlyBudget(planner.monthlyBudget);
        setLocalSelectedGoalId(planner.selectedGoalId || defaultGoalId());
    }, [categories, planner, goals]);

    const totalAllocated = localCategories.reduce((sum, cat) => sum + cat.monthlyLimit, 0);
    const remaining = localMonthlyBudget - totalAllocated;

    const handleSliderChange = (index, value) => {
        const updatedCategories = [...localCategories];
        updatedCategories[index] = { ...updatedCategories[index], monthlyLimit: value };

        const newTotal = updatedCategories.reduce((sum, cat) => sum + cat.monthlyLimit, 0);
        if (newTotal > localMonthlyBudget) {
            updatedCategories[index].monthlyLimit = Math.max(0, value - (newTotal - localMonthlyBudget));
        }

        setLocalCategories(updatedCategories);
    };

    const handleReset = () => {
        setLocalCategories(categories.map(cat => ({ ...cat, monthlyLimit: 0 })));
        setLocalMonthlyBudget(0);
        setLocalSelectedGoalId(defaultGoalId());
    };

    const handleSave = async () => {
        const plannerHasChanges = localMonthlyBudget !== planner.monthlyBudget
            || localSelectedGoalId !== planner.selectedGoalId;
        const categoriesHasChanges = hasChangesLists(localCategories, categories);

        if (!plannerHasChanges && !categoriesHasChanges) {
            showInfoToast("Planner settings are already up-to-date.");
            return;
        }

        const plannerData = {
            monthlyBudget: localMonthlyBudget,
            selectedGoalId: localSelectedGoalId,
            categories: localCategories
        };

        const result = await updatePlannerSettings(plannerData, token);
        if (result.success) {
            dispatch(setPlannerAction(plannerData));
            if (categoriesHasChanges) dispatch(updateCategoriesLimitsAction(localCategories));
            showSuccessToast(result.message);
        } else {
            showErrorSwal(result.message);
        }
    };

    return (
        <div className={styles["budget-tab"]}>
            <h2>Set Monthly Limits by Category</h2>
            <BudgetAllocator
                currency={currency}
                budget={budget}
                totalAllocated={totalAllocated}
                localMonthlyBudget={localMonthlyBudget}
                setLocalMonthlyBudget={setLocalMonthlyBudget}
            />
            <CategoriesSection
                categories={localCategories}
                maxBudget={localMonthlyBudget}
                onChange={handleSliderChange}
            />
            <SurplusAllocator
                remaining={remaining}
                currency={currency}
                localSelectedGoalId={localSelectedGoalId}
                setLocalSelectedGoalId={setLocalSelectedGoalId}
                goals={goals}
            />
            <div className={styles["div-buttons"]}>
                <button onClick={handleReset} className={styles["btn-reset"]}>Reset All</button>
                <button onClick={handleSave} className={styles["btn-save"]}>Save Changes</button>
            </div>
        </div>
    );
};

export default BudgetTab;