import { createAsyncThunk } from "@reduxjs/toolkit";
import { CategoryView, SubCategoryView } from "../../modules/categories/models/CategoryView";
import { CategoryService } from "../../modules/categories/services/CategoryService";
import { AuthUtil } from "../../util/AuthUtil";


/* PRIVATE */
export const craeteSubCategoryAction: any = createAsyncThunk("categories/craeteSubCategoryAction",
    async (payload: {sub: SubCategoryView,categoryId : string}, {rejectWithValue}):
     Promise<{ msg: string } | any> => {
        try {
            if(AuthUtil.isSetTokenToHeader())
            {
                const {sub,categoryId} = payload;
                const response = await CategoryService.createSubCategory(sub,categoryId); 
                return response.data;
            }
        } catch (error: any) {
            if (!error.response) {
                throw error
            }
            return rejectWithValue(error.response.data) 
            // rejectWithValue catches the server response.
            // inbuilt function of createAsyncThunk
        }
    });
/* PRIVATE */
export const getAllCategoriesAction: any = createAsyncThunk("categories/getAllCategoriesAction",
async (payload: {}, {rejectWithValue}):
    Promise< CategoryView[] | any> => {
    try {
        if(AuthUtil.isSetTokenToHeader()){
            const response = await CategoryService.getAllCategories();
            return response.data;
        }   
    } catch (error: any) {
        if (!error.response) {
            throw error
        }
        return rejectWithValue(error.response.data)
    }
});