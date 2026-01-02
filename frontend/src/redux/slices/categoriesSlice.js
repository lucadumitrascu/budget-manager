import { createSlice } from "@reduxjs/toolkit";

const categoriesSlice = createSlice({
    name: "categories",
    initialState: [],
    reducers: {
        setCategoriesAction: (state, action) => {
            return action.payload;
        },
        addCategoryAction: (state, action) => {
            return [...state, action.payload];
        },
        updateCategoryAction: (state, action) => {
            return state.map(category =>
                category.id === action.payload.id
                    ? action.payload
                    : category
            );
        },
        deleteCategoryAction: (state, action) => {
            return state.filter(
                category => category.id !== action.payload
            );
        },
    },
});

export const {
    setCategoriesAction,
    addCategoryAction,
    updateCategoryAction,
    deleteCategoryAction,
} = categoriesSlice.actions;

export default categoriesSlice.reducer;
