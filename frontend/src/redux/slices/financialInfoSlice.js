import { createSlice } from "@reduxjs/toolkit";

const financialInfoSlice = createSlice({
    name: "financialInfo",
    initialState: {
        budget: 0,
        currency: "RON",
        salary: 0,
        salaryDay: 0,
    },
    reducers: {
        setFinancialInfoAction: (state, action) => {
            const { budget, currency, salary, salaryDay } = action.payload;
            state.budget = budget;
            state.currency = currency;
            state.salary = salary;
            state.salaryDay = salaryDay;
        },
        setBudgetAction: (state, action) => {
            state.budget = action.payload;
        },
        setCurrencyAction: (state, action) => {
            state.currency = action.payload;
        },
        setSalaryAction: (state, action) => {
            state.salary = action.payload;
        },
        setSalaryDayAction: (state, action) => {
            state.salaryDay = action.payload;
        },
    },
});

export const {
    setFinancialInfoAction,
    setBudgetAction,
    setCurrencyAction,
    setSalaryAction,
    setSalaryDayAction
} = financialInfoSlice.actions;

export default financialInfoSlice.reducer;
