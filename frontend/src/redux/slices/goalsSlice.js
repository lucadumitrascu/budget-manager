import { createSlice } from "@reduxjs/toolkit";

const goalsSlice = createSlice({
    name: "goals",
    initialState: [],
    reducers: {
        setGoalsAction: (state, action) => {
            return action.payload;
        },
        addGoalAction: (state, action) => {
            return [...state, action.payload];
        },
        updateGoalAction: (state, action) => {
            return state.map(goal =>
                goal.id === action.payload.id
                    ? action.payload
                    : goal
            );
        },
        deleteGoalAction: (state, action) => {
            return state.filter(
                goal => goal.id !== action.payload
            );
        },
        adjustGoalCurrentAmountAction: (state, action) => {
            const { goalName, amount } = action.payload;
            const goal = state.find(g => g.name === goalName);
            if (goal) {
                goal.currentAmount += amount;
            }
        },
        withdrawFundsFromGoalAction: (state, action) => {
            const goal = state.find(g => g.name === action.payload);
            if (goal) {
                goal.currentAmount = 0;
            }
        },
    },
});

export const {
    setGoalsAction,
    addGoalAction,
    updateGoalAction,
    deleteGoalAction,
    adjustGoalCurrentAmountAction,
    withdrawFundsFromGoalAction,
} = goalsSlice.actions;

export default goalsSlice.reducer;
