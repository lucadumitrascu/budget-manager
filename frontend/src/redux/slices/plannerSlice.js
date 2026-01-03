import { createSlice } from "@reduxjs/toolkit";

const plannerSlice = createSlice({
    name: "planner",
    initialState: {
        monthlyBudget: 0,
        selectedGoalId: null,
    },
    reducers: {
        setPlannerAction: (state, action) => {
            const { monthlyBudget, selectedGoalId } = action.payload;
            state.monthlyBudget = monthlyBudget;
            state.selectedGoalId = selectedGoalId;
        },
        setSelectedGoalIdAction: (state, action) => {
            state.selectedGoalId = action.payload;
        },
    },
});

export const {
    setPlannerAction,
    setSelectedGoalIdAction,
} = plannerSlice.actions;

export default plannerSlice.reducer;
