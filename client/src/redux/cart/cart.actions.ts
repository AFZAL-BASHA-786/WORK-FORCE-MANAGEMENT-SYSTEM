import {createAsyncThunk} from "@reduxjs/toolkit";
import { CartRequestView } from "../../modules/cart/models/CartRequestView";
import { CartService } from "../../modules/cart/services/CartService";
import { CartResponseView } from "../../modules/cart/models/CartResponseView";
import { AuthUtil } from "../../util/AuthUtil";

/**
 * createCartAction
 */
export const createCartAction: any = createAsyncThunk("carts/createCartAction",
    async (cart: CartRequestView , {rejectWithValue}):Promise<{ msg: string, cart: CartResponseView } | any> => {
        try {
            if (AuthUtil.isSetTokenToHeader()){
                const response = await CartService.createCart(cart); 
                return response.data;
            }
        } catch (error: any) {
            if (!error.response) {
                throw error
            }
            return rejectWithValue(error)
        }
    });
// 
export const getCartInfoAction: any = createAsyncThunk("carts/getCartInfoAction",
    async (payload: {} , {rejectWithValue}):Promise<CartResponseView | any> => {
    try {
        if (AuthUtil.isSetTokenToHeader()){
            const response = await CartService.getCartInfo(); 
            return response.data;
        }   
    } catch (error: any) {
        if (!error.response) {
            throw error
        }
        return rejectWithValue(error)
    }
});