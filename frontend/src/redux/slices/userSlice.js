import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: { username: undefined },
    reducers: {
        setUsernameAction: (state, action) => {
            state.username = action.payload;
        },
    },
});

export const {
    setUsernameAction
} = userSlice.actions;

export default userSlice.reducer;
