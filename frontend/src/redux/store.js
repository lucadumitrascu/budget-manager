import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import financialInfoReducer from './slices/financialInfoSlice';
import categoryReducer from './slices/categorySlice';
import expenseReducer from './slices/expenseSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    financialInfo: financialInfoReducer,
    categories: categoryReducer,
    expenses: expenseReducer,
  },
});

export default store;
