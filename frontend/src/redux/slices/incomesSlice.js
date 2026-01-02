import { createSlice } from "@reduxjs/toolkit";

const incomesSlice = createSlice({
    name: "incomes",
    initialState: [],
    reducers: {
        setIncomesAction: (state, action) => {
            return action.payload;
        },
        addIncomeAction: (state, action) => {
            return [...state, action.payload];
        },
        updateIncomeAction: (state, action) => {
            return state.map(income =>
                income.id === action.payload.id
                    ? action.payload
                    : income
            );
        },
        deleteIncomeAction: (state, action) => {
            return state.filter(
                income => income.id !== action.payload
            );
        },
        updateIncomeSourceInIncomesAction: (state, action) => {
            const { oldIncomeSource, newIncomeSource } = action.payload;
            return state.map(income =>
                income.incomeSource === oldIncomeSource
                    ? { ...income, incomeSource: newIncomeSource }
                    : income
            );
        },
        deleteIncomesByIncomeSourceAction: (state, action) => {
            return state.filter(
                income => income.incomeSource !== action.payload
            );
        },
    },
});

export const {
    setIncomesAction,
    addIncomeAction,
    updateIncomeAction,
    deleteIncomeAction,
    updateIncomeSourceInIncomesAction,
    deleteIncomesByIncomeSourceAction,
} = incomesSlice.actions;

export default incomesSlice.reducer;
