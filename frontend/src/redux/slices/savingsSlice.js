import { createSlice } from "@reduxjs/toolkit";

const savingsSlice = createSlice({
    name: "savings",
    initialState: [],
    reducers: {
        setSavingsAction: (state, action) => {
            return action.payload;
        },
        addSavingAction: (state, action) => {
            return [...state, action.payload];
        },
        updateSavingAction: (state, action) => {
            return state.map(saving =>
                saving.id === action.payload.id
                    ? action.payload
                    : saving
            );
        },
        deleteSavingAction: (state, action) => {
            return state.filter(
                saving => saving.id !== action.payload
            );
        },
        updateGoalInSavingsAction: (state, action) => {
            const { oldGoal, newGoal } = action.payload;
            return state.map(saving =>
                saving.goal === oldGoal
                    ? { ...saving, goal: newGoal }
                    : saving
            );
        },
        deleteSavingsByGoalAction: (state, action) => {
            return state.filter(
                saving => saving.goal !== action.payload
            );
        },
    },
});

export const {
    setSavingsAction,
    addSavingAction,
    updateSavingAction,
    deleteSavingAction,
    updateGoalInSavingsAction,
    deleteSavingsByGoalAction,
} = savingsSlice.actions;

export default savingsSlice.reducer;
