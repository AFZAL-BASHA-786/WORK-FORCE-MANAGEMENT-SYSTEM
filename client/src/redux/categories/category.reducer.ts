import { SerializedError, createSlice, isRejectedWithValue } from "@reduxjs/toolkit";
import { CategoryView } from "../../modules/categories/models/CategoryView";
import * as categoryActions from "./category.actions"
import { ToastUtil } from "../../util/ToastUtil";

export const categoryFeatureKey = "categoryFeature";

export interface InitialState{
    loading: boolean;
    error: SerializedError;
    categories: CategoryView[];
    category: CategoryView
}

export const initilaState:InitialState = {
    loading: false,
    error: {} as SerializedError,
    categories: [] as CategoryView[],
    category: {} as CategoryView
} 

export const categorySlice = createSlice({
    name: "categorySlice",
    initialState: initilaState,
    reducers: {

    },
    extraReducers: (builder) => { 
        /* Create Category */
        builder.addCase(categoryActions.craeteSubCategoryAction.pending,(state)=>{
            state.loading = true;
        })
        .addCase(categoryActions.craeteSubCategoryAction.fulfilled,(state,action)=>{
            state.loading = false;
            ToastUtil.displaySuccessToast("SubCategory created successfully")
        })
        .addCase(categoryActions.craeteSubCategoryAction.rejected,(state,action)=>{
            state.loading = false;
            if(isRejectedWithValue(action)){
                ToastUtil.displayErrorToast("Sub Category creation failed!")
            }
        })

        /* Get All Categories */
        .addCase(categoryActions.getAllCategoriesAction.pending,(state)=>{
            state.loading = true;
        })
        .addCase(categoryActions.getAllCategoriesAction.fulfilled,(state,action)=>{
            state.loading = false;
            /* action .payload only because in categroyActions in Promise we directly 
            mentioned payload as categoryView[] .*/
            state.categories = action.payload ? action.payload : [];
        })
        .addCase(categoryActions.getAllCategoriesAction.rejected,(state,action)=>{
            state.loading = false;
            if(isRejectedWithValue(action)){
                ToastUtil.displayErrorToast("Unable to get Categories")
            }
        })
    }
})