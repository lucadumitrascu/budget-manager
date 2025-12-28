import { createSlice } from "@reduxjs/toolkit";

const incomeSourcesSlice = createSlice({
    name: "incomeSources",
    initialState: [],
    reducers: {
        setIncomeSourcesAction: (state, action) => {
            return action.payload;
        },
        addIncomeSourceAction: (state, action) => {
            return [...state, action.payload];
        },
        updateIncomeSourceAction: (state, action) => {
            return state.map(source =>
                source.id === action.payload.id
                    ? action.payload
                    : source
            );
        },
        deleteIncomeSourceAction: (state, action) => {
            return state.filter(
                source => source.id !== action.payload
            );
        },
    },
});

export const {
    setIncomeSourcesAction,
    addIncomeSourceAction,
    updateIncomeSourceAction,
    deleteIncomeSourceAction,
} = incomeSourcesSlice.actions;

export default incomeSourcesSlice.reducer;
