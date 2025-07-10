import {createAsyncThunk} from "@reduxjs/toolkit";
import { OrderRequestView } from "../../modules/orders/models/OrderRequestView";
import { OrderResponseView } from "../../modules/orders/models/OrderResponseView";
import { OrderService } from "../../modules/orders/services/OrderService";
import { AuthUtil } from "../../util/AuthUtil";

/**
 * placeOrderAction
 */
export const placeOrderAction: any = createAsyncThunk("orders/placeOrderAction",
    async (order: OrderRequestView , {rejectWithValue})
    :Promise<{ msg: string, order: OrderResponseView } | any> => {
        try {
            if (AuthUtil.isSetTokenToHeader()){
                /* await OrderService.placeOrder(order) brings  { data: { msg: string, order: OrderResponseView } }*/
                const response = await OrderService.placeOrder(order); 
                /* So remember the response we get from service is always an object */
                /* response = { data: { msg: string, order: OrderResponseView } } */
                return response.data; /* what we are returning here should be mentioned in promise */
                /* response.data = { msg: string, order: OrderResponseView }. Thats y we mentioned 
                this fromat in promise*/                
            }     
        } catch (error: any) {
            if (!error.response) {
                throw error
            }
            return rejectWithValue(error)
        }
    });

/**
 * getAllOrdersAction
 */
export const getAllOrdersAction: any = createAsyncThunk("orders/getAllOrdersAction",
    async (payload: {} , {rejectWithValue}):Promise<OrderResponseView[] | any> => {
        try {
            if (AuthUtil.isSetTokenToHeader()){
                const response = await OrderService.getAllOrders(); 
                return response.data;
            }
        } catch (error: any) {
            if (!error.response) {
                throw error
            }
            return rejectWithValue(error)
        }
    });

/**
 * getAllOrdersAction
 */
export const getMyOrdersAction: any = createAsyncThunk("orders/getMyOrdersAction",
    async (payload: {} , {rejectWithValue}):Promise<OrderResponseView[] | any> => {
        try {
            if (AuthUtil.isSetTokenToHeader()){
                const response = await OrderService.getMyOrders(); 
                return response.data;
            }
        } catch (error: any) {
            if (!error.response) {
                throw error
            }
            return rejectWithValue(error)
        }
    });

/**
 * updateOrderStatusAction
 */
export const updateOrderStatusAction: any = createAsyncThunk("orders/updateOrderStatusAction",
    async (payload: {orderStatus: string,orderId: string} , {rejectWithValue})
    :Promise<{ msg: string, order: OrderResponseView } | any> => {
        try {
            if (AuthUtil.isSetTokenToHeader()){
                const {orderStatus,orderId} = payload;
                const response = await OrderService.updateOrderStatus(orderStatus,orderId); 
                return response.data;
            }
        } catch (error: any) {
            if (!error.response) {
                throw error
            }
            return rejectWithValue(error)
        }
    });