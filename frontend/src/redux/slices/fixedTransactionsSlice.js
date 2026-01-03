import { createSlice } from "@reduxjs/toolkit";

const fixedTransactionsSlice = createSlice({
    name: "fixedTransactions",
    initialState: [],
    reducers: {
        setFixedTransactionsAction: (state, action) => {
            return action.payload;
        },
        addFixedTransactionAction: (state, action) => {
            return [...state, action.payload];
        },
        updateFixedTransactionAction: (state, action) => {
            return state.map(transaction =>
                transaction.id === action.payload.id
                    ? action.payload
                    : transaction
            );
        },
        deleteFixedTransactionAction: (state, action) => {
            return state.filter(
                transaction => transaction.id !== action.payload
            );
        },
    },
});

export const {
    setFixedTransactionsAction,
    addFixedTransactionAction,
    updateFixedTransactionAction,
    deleteFixedTransactionAction,
} = fixedTransactionsSlice.actions;

export default fixedTransactionsSlice.reducer;
