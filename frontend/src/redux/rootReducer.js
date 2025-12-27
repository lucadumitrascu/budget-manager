import { combineReducers } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import financialInfoReducer from './slices/financialInfoSlice';
import categoryReducer from './slices/categorySlice';
import expenseReducer from './slices/expenseSlice';
import { logoutUserAction } from './rootActions';

const appReducer = combineReducers({
  user: userReducer,
  financialInfo: financialInfoReducer,
  categories: categoryReducer,
  expenses: expenseReducer,
});

const rootReducer = (state, action) => {
  if (action.type === logoutUserAction.type) {
    state = undefined;
  }
  return appReducer(state, action);
};

export default rootReducer;
