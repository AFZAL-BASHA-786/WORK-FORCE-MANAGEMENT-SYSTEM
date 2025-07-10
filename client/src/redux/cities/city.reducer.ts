// // import { SerializedError, createSlice, isRejectedWithValue } from "@reduxjs/toolkit";
// // import { OrderResponseView } from "../../modules/orders/models/OrderResponseView";
// // // import * as orderActions from "./orders.actions"
// // import * as cityActions from "./city.actions";
// // import { ToastUtil } from "../../util/ToastUtil";
// // import { Cities } from "../../modules/products/models/Cities";


// // export const cityFeatureKey = "cityFeature";

// // export interface InitialState{
// //     loading: boolean;
// //     errorMessage: SerializedError;
// //     city: Cities
// // }

// // const initialState: InitialState = {
// //     loading: false,
// //     errorMessage: {} as SerializedError,
// //     city: {} as Cities
// // }

// // export const citySlice = createSlice({
// //     name: "citySlice",
// //     initialState: initialState,
// //     reducers: {},
// //     extraReducers: (builder)=>{
// //         // placeOrderAction
// //         builder.addCase(cityActions.getCity.pending,(state)=>{
// //             state.loading = true;
// //         }).addCase(cityActions.getCity.fulfilled,(state,action)=>{
// //             state.loading = false;
// //             state.city = action.payload.city;
// //             // /* ToastUtil.displaySuccessToast(action.payload?.msg? action.payload?.msg : "Order is Placed Successfully"); */
// //             ToastUtil.displaySuccessToast("Order is Placed Successfully");
// //         }).addCase(cityActions.getCity.rejected,(state,action)=>{
// //             state.loading = false;
// //             if (isRejectedWithValue(action)) {
// //                 /* ToastUtil.displayErrorToast(action.payload?.msg? action.payload?.msg : "Order is not Placed" ); */
// //                 ToastUtil.displayErrorToast("Unable to Place an Order");
// //             }
// //         })



// //     }
// // })

// // city.slice.ts

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Cities } from "../../modules/products/models/Cities";
export const cityFeatureKey = "cityFeature";

export interface CityState {
    selectedCity: string | null;
}

const initialState: CityState = {
    selectedCity: null,
};

export const citySlice = createSlice({
    name: "city",
    initialState,
    reducers: {
        setSelectedCity(state, action: PayloadAction<string>) {
            state.selectedCity = action.payload;
        },
    },
});

export const { setSelectedCity } = citySlice.actions;

export default citySlice.reducer;


// city.reducer.ts







// CITY ACTIONSS

// import {createAsyncThunk} from "@reduxjs/toolkit";
// import {UserService} from "../../modules/users/services/UserService";
// import {AuthUtil} from "../../util/AuthUtil";
// import { UserView } from "../../modules/users/models/UserView";
// import { AddressView } from "../../modules/users/models/AddressView";
// import { Cities } from '../../modules/products/models/Cities';
// import { CityService } from "../../modules/products/services/CityService";


// /**
//  * PUBLIC
//  */
// export const getCity: any = createAsyncThunk("cities/getCity",
//     async (payload: { city: Cities }, {rejectWithValue}):
//      Promise<{ msg: string, city: Cities } | any> => {
//         try {
//             const {city} = payload;
//             const response = await CityService.getCity(city); 
//             // console.log(response.data);
//             return response.data;
//         } catch (error: any) {
//             if (!error.response) {
//                 throw error
//             }
//             return rejectWithValue(error) 
//             // rejectWithValue catches the server response.
//             // inbuilt function of createAsyncThunk
//         }
//     });

