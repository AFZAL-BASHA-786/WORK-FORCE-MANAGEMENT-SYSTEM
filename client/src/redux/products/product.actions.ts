import {createAsyncThunk} from "@reduxjs/toolkit";
import {AuthUtil} from "../../util/AuthUtil";
import { ProductRequestView } from "../../modules/products/models/ProductRequestView";
import { ProductResponseView } from "../../modules/products/models/ProductResponseView";
import { ProductService } from "../../modules/products/services/ProductService";

/**
 * PRIVATE
 */
export const createProductAction: any = createAsyncThunk("products/createProductAction",
    async (product: ProductRequestView, {rejectWithValue}):
    Promise<{data:{msg: string, product: ProductResponseView}} | any> => {
        try {
            if(AuthUtil.isSetTokenToHeader()){
                const response = await ProductService.createProduct(product); 
                // console.log(response.data);
                return response.data;
            }
        } catch (error: any) {
            if (!error.response) {
                throw error
            }
            return rejectWithValue(error) 
            // rejectWithValue catches the server response.
            // inbuilt function of createAsyncThunk
        }
    });

/* PRIVATE */

export const updateProductAction: any = createAsyncThunk("products/updateProductAction",
    async (payload:{product: ProductRequestView, productId: string}, {rejectWithValue}):
    Promise<{msg: string, product: ProductResponseView} | any> => {
        try {
            let {product,productId} = payload
            if(AuthUtil.isSetTokenToHeader()){
                const response = await ProductService.updateProduct(product,productId); 
                // console.log(response.data);
                return response.data;
            }
        } catch (error: any) {
            if (!error.response) {
                throw error
            }
            return rejectWithValue(error) 
            // rejectWithValue catches the server response.
            // inbuilt function of createAsyncThunk
        }
    });


export const getAllProductsAction: any = createAsyncThunk("products/getAllProductsAction",
    async (payload:any, {rejectWithValue}):
    Promise<ProductResponseView[] | any> => {
        try {
            if(AuthUtil.isSetTokenToHeader()){
                const response = await ProductService.getAllProducts(); 
                // console.log(response.data);
                return response.data;
            }
        } catch (error: any) {
            if (!error.response) {
                throw error
            }
            return rejectWithValue(error) 
            // rejectWithValue catches the server response.
            // inbuilt function of createAsyncThunk
        }
    });

export const getProductAction: any = createAsyncThunk("products/getProductAction",
    async (payload:{productId : string}, {rejectWithValue}):
    Promise<ProductResponseView | any> => {
        try {
            if(AuthUtil.isSetTokenToHeader()){
                const {productId} = payload;
                const response = await ProductService.getProduct(productId); 
                // console.log(response.data);
                return response.data;
            }
        } catch (error: any) {
            if (!error.response) {
                throw error
            }
            return rejectWithValue(error) 
            // rejectWithValue catches the server response.
            // inbuilt function of createAsyncThunk
        }
    });

export const deleteProductAction: any = createAsyncThunk("products/deleteProductAction",
    async (payload: {productId: string},{rejectWithValue}):
    Promise<{msg: string}|any> => {
        try{
            if(AuthUtil.isSetTokenToHeader()){
                const {productId} = payload;
                const response = await ProductService.deleteProduct(productId);
                return response.data;
            }
        }
        catch(error:any){
            if (!error.response) {
                throw error
            }
            return rejectWithValue(error) 
        }
    });


export const getAllProductsWithCategoryIdAction: any = createAsyncThunk("products/getAllProductsWithCategoryIdAction",
    async (payload: {categoryId:string},{rejectWithValue}):
    Promise<ProductResponseView[]|any> => {
        try{
            if(AuthUtil.isSetTokenToHeader()){
                const {categoryId} = payload;
                const response = await ProductService.getAllProductsWithCategoryId(categoryId);
                return response.data;
            }
        }
        catch(error:any){
            if (!error.response) {
                throw error
            }
            return rejectWithValue(error) 
        }
    });


/* PRIVATE */

/* export const updateProductQuantityAction: any = createAsyncThunk("products/updateProductQuantityAction",
    async (payload:{productId: string,quantity: string }, {rejectWithValue}):
    Promise<{msg: string, product: ProductResponseView} | any> => {
        try {
            let {productId,quantity} = payload
            if(AuthUtil.isSetTokenToHeader()){
                const response = await ProductService.updateProductQuantity(productId,quantity); 
                // console.log(response.data);
                return response.data;
            }
        } catch (error: any) {
            if (!error.response) {
                throw error
            }
            return rejectWithValue(error) 
            // rejectWithValue catches the server response.
            // inbuilt function of createAsyncThunk
        }
    }); */
