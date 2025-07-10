import { SerializedError, createSlice, isRejectedWithValue } from "@reduxjs/toolkit";
import { ProductResponseView } from "../../modules/products/models/ProductResponseView";
import { ToastUtil } from "../../util/ToastUtil";
import * as cartActions from "./cart.actions"
import { Cart} from "../../modules/cart/models/CartResponseView";

export const cartFeatureKey = "cartFeature";

export interface InitialState{
    loading: boolean;
    error: SerializedError;
    products: ProductResponseView[];
    total: string;
    tax: string;
    grandTotal: string;
    cart: Cart;
}

const initialState : InitialState = {
    cart: {} as Cart,
    loading: false,
    error: {} as SerializedError,
    products: [] as ProductResponseView[],
    total: "",
    tax: "",
    grandTotal: ""
}

export const cartSlice = createSlice({
    name: "cartSlice",
    initialState: initialState,
    reducers: {
        clearCart: (state,action) => {
            state.products = [] ;
        },
        addToCart: (state,action) => {
            const {product} = action.payload;
            const isExists = state.products.find(item=> item._id === product._id)
            if(isExists){
                /* if product is already exist. there is no need to add it again and duplicate the data */
                ToastUtil.displayInfoToast("Worker is already in the cart")
                return ;
            }
            ToastUtil.displaySuccessToast("Woker is added to the cart")
            state.products = [...state.products,product];
            /* if state.products = [product1, product2, product3] 
                then if we want to add product4
                state.products = [product1, product2, product3, product4]
                                        or
                state.products = [...state.products,product];
                where ...state.products brings previous three products
            */
        },
        // incrementCartProductCount: (state,action) => {
        //     const {productId,quantity} = action.payload;
        //     state.products=state.products.map(item => {
        //         if(item._id === productId && item.count && item.count < quantity){
        //             return {
        //                 ...item,
        //                 count: item.count? item.count+1 : 1
        //             }
        //         }
        //         return item;
        //     })
        // },
        // decrementCartProductCount: (state,action) => {
        //     const {productId} = action.payload;
        //     state.products=state.products.map(item => {
        //         if(item._id === productId){
        //             return {
        //                 ...item,
        //                 count: item.count -1>0? item.count -1: 1
        //             }
        //         }
        //         return item;
        //     })
        // },
        deleteProductFromCart: (state,action) => {
            const {productId} = action.payload;
            state.products = state.products.filter(item => item._id !== productId);
        }
    },
    extraReducers: (builder)=>{
        // createCartAction
        builder.addCase(cartActions.createCartAction.pending,(state)=>{
            state.loading = true;
        }).addCase(cartActions.createCartAction.fulfilled,(state,action)=>{
            state.loading = false;
            state.cart = action.payload.cart;
        }).addCase(cartActions.createCartAction.rejected, (state, action) => {
            state.loading = false;
            if (isRejectedWithValue(action)) {
                ToastUtil.displayErrorToast(`Unable to create cart at server`);
            }
        })

        // getCartInfoAction
        .addCase(cartActions.getCartInfoAction.pending,(state)=>{
            state.loading = true;
        }).addCase(cartActions.getCartInfoAction.fulfilled,(state,action)=>{
            state.loading = false;
            state.cart = action.payload;
        }).addCase(cartActions.getCartInfoAction.rejected, (state, action) => {
            state.loading = false;
            if (isRejectedWithValue(action)) {
                ToastUtil.displayErrorToast(`Unable to Get cart from server`);
            }
        })
    }
});

export const {clearCart,addToCart,deleteProductFromCart} = cartSlice.actions

