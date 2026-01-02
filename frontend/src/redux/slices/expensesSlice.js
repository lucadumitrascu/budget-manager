import { createSlice } from "@reduxjs/toolkit";

const expensesSlice = createSlice({
    name: "expenses",
    initialState: [],
    reducers: {
        setExpensesAction: (state, action) => {
            return action.payload;
        },
        addExpenseAction: (state, action) => {
            return [...state, action.payload];
        },
        updateExpenseAction: (state, action) => {
            return state.map(expense =>
                expense.id === action.payload.id
                    ? action.payload
                    : expense
            );
        },
        deleteExpenseAction: (state, action) => {
            return state.filter(
                expense => expense.id !== action.payload
            );
        },
        updateCategoryInExpensesAction: (state, action) => {
            const { oldCategory, newCategory } = action.payload;
            return state.map(expense =>
                expense.category === oldCategory
                    ? { ...expense, category: newCategory }
                    : expense
            );
        },
        deleteExpensesByCategoryAction: (state, action) => {
            return state.filter(
                expense => expense.category !== action.payload
            );
        },
    },
});

export const {
    setExpensesAction,
    addExpenseAction,
    updateExpenseAction,
    deleteExpenseAction,
    updateCategoryInExpensesAction,
    deleteExpensesByCategoryAction,
} = expensesSlice.actions;

export default expensesSlice.reducer;
