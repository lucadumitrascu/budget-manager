import { combineReducers } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import financialInfoReducer from "./slices/financialInfoSlice";
import categoriesReducer from "./slices/categoriesSlice";
import expensesReducer from "./slices/expensesSlice";
import incomesReducer from "./slices/incomesSlice";
import incomeSourcesReducer from "./slices/incomeSourcesSlice";
import savingsReducer from "./slices/savingsSlice";
import goalsReducer from "./slices/goalsSlice";
import plannerReducer from "./slices/plannerSlice";
import fixedTransactionsReducer from "./slices/fixedTransactionsSlice";
import { logoutUserAction, resetUserDataAction } from "./rootActions";

const appReducer = combineReducers({
    user: userReducer,
    financialInfo: financialInfoReducer,
    categories: categoriesReducer,
    expenses: expensesReducer,
    incomeSources: incomeSourcesReducer,
    incomes: incomesReducer,
    goals: goalsReducer,
    savings: savingsReducer,
    planner: plannerReducer,
    fixedTransactions: fixedTransactionsReducer,
});

const rootReducer = (state, action) => {
    if (action.type === logoutUserAction.type) {
        state = undefined;
    }
    if (action.type === resetUserDataAction.type) {
        return appReducer(undefined, action);
    }
    return appReducer(state, action);
};

export default rootReducer;
