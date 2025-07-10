import {combineReducers} from "@reduxjs/toolkit";
import * as userReducer from "./users/user.reducer";
import * as categoryReducer from "./categories/category.reducer"
import * as productReducer from "./products/product.reducer"
import * as cartReducer from "./cart/cart.reducer"
import * as orderReducer from "./orders/orders.reducer"
import * as cityReducer from "./cities/city.reducer"
const rootReducer: any = combineReducers({
    [userReducer.userFeatureKey]: userReducer.userSlice.reducer,
    [categoryReducer.categoryFeatureKey] : categoryReducer.categorySlice.reducer,
    [productReducer.productFeatureKey] : productReducer.productSlice.reducer,
    [cartReducer.cartFeatureKey] : cartReducer.cartSlice.reducer,
    [orderReducer.orderFeatureKey]: orderReducer.orderSlice.reducer,
    [cityReducer.cityFeatureKey]: cityReducer.citySlice.reducer
});
export default rootReducer;