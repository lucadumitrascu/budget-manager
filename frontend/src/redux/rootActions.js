import { createAction } from "@reduxjs/toolkit";
export const logoutUserAction = createAction("app/logoutUser");
export const resetUserDataAction = createAction("app/resetAccountData");