import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import financialInfoReducer from './slices/financialInfoSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    financialInfo: financialInfoReducer,
  },
});

export default store;
