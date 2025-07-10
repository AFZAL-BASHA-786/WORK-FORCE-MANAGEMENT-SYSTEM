import { SerializedError, createSlice, isRejectedWithValue } from "@reduxjs/toolkit";
import { OrderResponseView } from "../../modules/orders/models/OrderResponseView";
import * as orderActions from "./orders.actions"
import { ToastUtil } from "../../util/ToastUtil";

export const orderFeatureKey = "orderFeature";

export interface InitialState{
    loading: boolean;
    errorMessage: SerializedError;
    orders: OrderResponseView[];
    order: OrderResponseView;
}

const initialState: InitialState = {
    loading: false,
    errorMessage: {} as SerializedError,
    orders: [] as OrderResponseView[],
    order: {} as OrderResponseView
}

export const orderSlice = createSlice({
    name: "orderSlice",
    initialState: initialState,
    reducers: {},
    extraReducers: (builder)=>{
        // placeOrderAction
        builder.addCase(orderActions.placeOrderAction.pending,(state)=>{
            state.loading = true;
        }).addCase(orderActions.placeOrderAction.fulfilled,(state,action)=>{
            state.loading = false;
            state.order = action.payload.order;
            // /* ToastUtil.displaySuccessToast(action.payload?.msg? action.payload?.msg : "Order is Placed Successfully"); */
            ToastUtil.displaySuccessToast("Appointment is Placed Successfully");
        }).addCase(orderActions.placeOrderAction.rejected,(state,action)=>{
            state.loading = false;
            if (isRejectedWithValue(action)) {
                /* ToastUtil.displayErrorToast(action.payload?.msg? action.payload?.msg : "Order is not Placed" ); */
                ToastUtil.displayErrorToast("Unable to Place an Appointment");
            }
        })

        // getAllOrdersAction
        builder.addCase(orderActions.getAllOrdersAction.pending,(state)=>{
            state.loading = true;
        }).addCase(orderActions.getAllOrdersAction.fulfilled,(state,action)=>{
            state.loading = false;
            state.orders = action.payload;
        }).addCase(orderActions.getAllOrdersAction.rejected,(state,action)=>{
            state.loading = false;
            if (isRejectedWithValue(action)) {
                ToastUtil.displayErrorToast("Unable to get Appointment from server");
            }
        })

        // getAllOrdersAction
        builder.addCase(orderActions.getMyOrdersAction.pending,(state)=>{
            state.loading = true;
        }).addCase(orderActions.getMyOrdersAction.fulfilled,(state,action)=>{
            state.loading = false;
            state.orders = action.payload;
        }).addCase(orderActions.getMyOrdersAction.rejected,(state,action)=>{
            state.loading = false;
            if (isRejectedWithValue(action)) {
                ToastUtil.displayErrorToast("Unable to get Appointments from server");
            }
        })

        // updateOrderStatusAction
        builder.addCase(orderActions.updateOrderStatusAction.pending,(state)=>{
            state.loading = true;
        }).addCase(orderActions.updateOrderStatusAction.fulfilled,(state,action)=>{
            state.loading = false;
            state.order = action.payload.order;
            ToastUtil.displaySuccessToast("Updated the Appointment status Successfully");
        }).addCase(orderActions.updateOrderStatusAction.rejected,(state,action)=>{
            state.loading = false;
            if (isRejectedWithValue(action)) {
                ToastUtil.displayErrorToast("Unable to update the status");
            }
        })

    }
})