import React, { useEffect } from 'react'; 
import './App.css';
import ToastConiguration from './modules/ui/components/ToastConiguration';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './modules/layout/pages/home/HomePage';
import UserLogin from './modules/users/pages/UserLogin';
import UserRegister from './modules/users/pages/UserRegister';
import UserProfile from './modules/users/pages/UserProfile';
import ProductList from './modules/products/pages/products-list/ProductList';
import { AppDispatch, useAppDispatch } from './redux/store';
import * as userActions from "./redux/users/user.actions";
import AddCategory from './modules/categories/pages/add-category/AddCategory';
import { AuthUtil } from './util/AuthUtil';
import UploadProduct from './modules/products/pages/upload-product/UploadProduct';
import ManageProducts from './modules/products/pages/manage-products/ManageProducts';
import EditProduct from './modules/products/pages/edit-product/EditProduct';
import ViewProduct from './modules/products/pages/view-product/ViewProduct';
import CartPage from './modules/cart/pages/CartPage';
import CheckOutPage from './modules/cart/pages/CheckOutPage';
import AddShippingAddress from './modules/users/pages/AddShippingAddress';
import EditShippingAddress from './modules/users/pages/EditShippingAddress';
import OrderDetails from './modules/orders/pages/OrderDetails';
import YourOrders from './modules/orders/pages/YourOrders';
import ManageOrders from './modules/orders/pages/ManageOrders';
import PrivateRoute from './router/PrivateRoute';
import AdminRoute from './router/AdminRoute';
import SuperAdminRoute from './router/SuperAdminRoute';
import UnskilledCatalogue from './modules/products/pages/catalogues/unskilled catalogue/UnskilledCatalogue';
import SkilledCatalogue from './modules/products/pages/catalogues/skilled-catalogue/SkilledCatalogue';
import SemiSkilledCatalogue from './modules/products/pages/catalogues/semi-skilled catalogue/SemiSkilledCatalogue';

const App:React.FC = ()=> { 
  const dispatch:AppDispatch = useAppDispatch();
  /* once you login user authentication will be true and shows start shopping in home page instaed of Login
   Video: 31 . time: 1hr: 26 min */
   
   
  useEffect(()=>{
    if(AuthUtil.isSetTokenToHeader()){
      dispatch(userActions.getUserInfoAction())
    }    
  },[dispatch])
  /* To overcome the warning */
  /* useEffect(()=>{
     dispatch(userActions.getUserInfoAction())
   })  */

  /* 
  useEffect(()=>{
    dispatch(userActions.getUserInfoAction())
  },[dispatch])
  */
  
  return (
    <>
      <ToastConiguration/>  
      <BrowserRouter>
        <Routes>
          {/*  */}
          <Route path={"/"} element={<HomePage/>}/>
          <Route path={"/products/list"} element={<ProductList/>}/>
          <Route path={"/products/fashion"} element={
            <PrivateRoute>
              <SkilledCatalogue/>
            </PrivateRoute>
          }/>
          <Route path={"/products/electronics"} element={
            <PrivateRoute>
            <SemiSkilledCatalogue/>
            </PrivateRoute>
          }/>
          <Route path={"/products/household"} element={
            <PrivateRoute>
              <UnskilledCatalogue/>
            </PrivateRoute>
          }/>
          <Route path={"/products/upload"} element={
            <AdminRoute>
              <UploadProduct/>
            </AdminRoute>
          }/>
          <Route path={"/products/edit/:productId"} element={
            <AdminRoute>
              <EditProduct/>
            </AdminRoute>
          }/>
          <Route path={"/products/view/:categoryName/:productId"} element={
            <PrivateRoute>
              <ViewProduct/>
            </PrivateRoute>
          }/>
          <Route path={"/products/manage"} element={
            <SuperAdminRoute>
              <ManageProducts/>
            </SuperAdminRoute>
          }/>
          <Route path={'/users/login'} element={<UserLogin/>}/>
          <Route path={'/users/register'} element={<UserRegister/>}/>
          <Route path={'/users/profile'} element={
            <PrivateRoute>
              <UserProfile/>
            </PrivateRoute>
          }/>
          <Route path={'/users/add-shipping-address'} element={
            <PrivateRoute>
              <AddShippingAddress/>
            </PrivateRoute>
          }/>
          <Route path={'/users/edit-shipping-address/:addressId'} element={
            <PrivateRoute>
              <EditShippingAddress/>
            </PrivateRoute>
          }/>
          <Route path={'/categories/add'} element={
            <SuperAdminRoute>
              <AddCategory/>
            </SuperAdminRoute>
          }/>
          <Route path={'/cart/list'} element={
            <PrivateRoute>
              <CartPage/>
            </PrivateRoute>
          }/>
          <Route path={'/cart/checkout'} element={
            <PrivateRoute>
              <CheckOutPage/>
            </PrivateRoute>
          }/>
          <Route path={'/orders/details'} element={
            <PrivateRoute>
              <OrderDetails/>
            </PrivateRoute>
          }/>
          <Route path={'/orders/me'} element={
            <PrivateRoute>
              <YourOrders/>
            </PrivateRoute>
          }/>
          <Route path={'/orders/manage'} element={
            <SuperAdminRoute>
              <ManageOrders/>
            </SuperAdminRoute>
          }/>
          <Route path={"/products/skilled"} element={
            <PrivateRoute>
              <SkilledCatalogue/>
            </PrivateRoute>
          }/>
          <Route path={"/products/semi-skilled"} element={
            <PrivateRoute>
            <SemiSkilledCatalogue/>
            </PrivateRoute>
          }/>
          <Route path={"/products/unskilled"} element={
            <PrivateRoute>
              <UnskilledCatalogue/>
            </PrivateRoute>
          }/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
