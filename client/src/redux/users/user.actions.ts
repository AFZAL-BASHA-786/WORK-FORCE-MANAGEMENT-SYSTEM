import {createAsyncThunk} from "@reduxjs/toolkit";
import {UserService} from "../../modules/users/services/UserService";
import {AuthUtil} from "../../util/AuthUtil";
import { UserView } from "../../modules/users/models/UserView";
import { AddressView } from "../../modules/users/models/AddressView";

/**
 * PUBLIC
 */
export const registerUserAction: any = createAsyncThunk("users/registerUserAction",
    async (payload: { user: UserView }, {rejectWithValue}):
     Promise<{ msg: string, data: UserView } | any> => {
        try {
            const {user} = payload;
            const response = await UserService.registerUser(user); 
            // console.log(response.data);
            return response.data;
        } catch (error: any) {
            if (!error.response) {
                throw error
            }
            return rejectWithValue(error) 
            // rejectWithValue catches the server response.
            // inbuilt function of createAsyncThunk
        }
    });

/**
 * PUBLIC
 */
export const loginUserAction: any = createAsyncThunk("users/loginUserAction",
    async (payload: { user: UserView }, {rejectWithValue})
    : Promise<{ msg: string, user: UserView, token: string } | any> => {
        try {
            const {user} = payload;
            const response = await UserService.loginUser(user);
            return response.data;
        } catch (error: any) {
            if (!error.response) {
                throw error
            }
            return rejectWithValue(error)
        }
    });

    /* we cant access admin without login to the account.
             But if we paste this url on the browser http://localhost:3000/contacts/admin
             we can access the admin page. To overcome this the only solution we have
             is token. if there is no token we can't enter into the admin page.
             Token is generated when we login to the account. In this way login is mandatory
             Use the concept of private router.
             Just see screenshot (177) and (178)
             http://localhost:3000/contacts/admin now if u enter this without login
              it will take you to login page not admin page
     */

/**
 * PRIVATE
 */
export const getUserInfoAction: any = createAsyncThunk("users/getUserInfoAction",
    async (payload:{}, {rejectWithValue})
    : Promise<{ user: UserView } | any> => {
        /* async (payload: {data:{ user: UserView }}, {rejectWithValue}) because we are   catching data from service 
            and Promise<{ user: UserView } | any>
        */

        try {
            /*if AuthUtil.isSetTokenToHeader() returns true then it will enter into the loop.
            it will become true when the user is loggedIn and user has the token.
            If they didn't loggedIn and doesn't have token then we should not allow 
            him/her to access the  user information. Thats y we used AuthUtil.isSetTokenToHeader()
             this function. In this way of checking makes it PRIVATE METHOD */

             
            
             //! The main thing is dispatch this action in App.tsx 
            if (AuthUtil.isSetTokenToHeader()) {
                const response = await UserService.getUserInfo();
                return response.data;
            }
        } catch (error: any) {
            if (!error.response) {
                throw error
            }
            return rejectWithValue(error)
        }
    });


export const updateProfilePictureAction: any = createAsyncThunk("users/updateProfilePictureAction",
    async (imageUrl: string, {rejectWithValue}) // async (payload:{imageUrl: string}, {rejectWithValue})
    : Promise<{ user: UserView } | any> => {
        /* async (payload: {data:{ user: UserView }}, {rejectWithValue}) because we are   catching data from service 
            and Promise<{ user: UserView } | any>
        */

        try {
            /*if AuthUtil.isSetTokenToHeader() returns true then it will enter into the loop.
            it will become true when the user is loggedIn and user has the token.
            If they didn't loggedIn and doesn't have token then we should not allow 
            him/her to access the  user information. Thats y we used AuthUtil.isSetTokenToHeader()
             this function. In this way of checking makes it PRIVATE METHOD */
            if (AuthUtil.isSetTokenToHeader()) {
                const response = await UserService.updateProfilePicture(imageUrl);
                return response.data;
            }
        } catch (error: any) {
            if (!error.response) {
                throw error
            }
            return rejectWithValue(error)
        }
    });

export const changePasswordAction: any = createAsyncThunk("users/changePasswordAction",
    async (password: string, {rejectWithValue}) // async (payload:{imageUrl: string}, {rejectWithValue})
    : Promise<{ user: UserView,msg: string } | any> => {
        /* async (payload: {data:{ user: UserView }}, {rejectWithValue}) because we are   catching data from service 
            and Promise<{ user: UserView } | any>
        */

        try {
            /*if AuthUtil.isSetTokenToHeader() returns true then it will enter into the loop.
            it will become true when the user is loggedIn and user has the token.
            If they didn't loggedIn and doesn't have token then we should not allow 
            him/her to access the  user information. Thats y we used AuthUtil.isSetTokenToHeader()
             this function. In this way of checking makes it PRIVATE METHOD */
            if (AuthUtil.isSetTokenToHeader()) {
                const response = await UserService.changePassword(password);
                return response.data;
            }
        } catch (error: any) {
            if (!error.response) {
                throw error
            }
            return rejectWithValue(error)
        }
    });

    /* //! ----------------------------------- ADDRESS ---------------------------------------*/
// Private Url
export const createNewAddressAction: any = createAsyncThunk("users/createNewAddressAction",
    async (address:AddressView, {rejectWithValue})
    : Promise<{ address:AddressView,msg: string } | any> => {
        try {
            if (AuthUtil.isSetTokenToHeader()) {
                const response = await UserService.createNewAddress(address);
                return response.data;
            }
        } catch (error: any) {
            if (!error.response) {
                throw error
            }
            return rejectWithValue(error)
        }
    });

// Private Url
export const updateAddressAction: any = createAsyncThunk("users/updateAddressAction",
    async (payload:{address:AddressView,addressId: string}, {rejectWithValue})
    : Promise<{ address:AddressView,msg: string } | any> => {
        try {
            if (AuthUtil.isSetTokenToHeader()) {
                let {address,addressId} = payload;
                const response = await UserService.updateAddress(address,addressId);
                return response.data;
            }
        } catch (error: any) {
            if (!error.response) {
                throw error
            }
            return rejectWithValue(error)
        }
    });

// Private Url
export const getAddressAction: any = createAsyncThunk("users/getAddressAction",
    async (payload:{}, {rejectWithValue})
    : Promise< AddressView | any> => {
        try {
            if (AuthUtil.isSetTokenToHeader()) {
                const response = await UserService.getAddress();
                return response.data;
            }
        } catch (error: any) {
            if (!error.response) {
                throw error 
            }
            return rejectWithValue(error)
        }
    });

// Private Url
export const deleteAddressAction: any = createAsyncThunk("users/deleteAddressAction",
    async (payload:{addressId :string}, {rejectWithValue})
    /* async (addressId :string, {rejectWithValue})  if payload is one field then 
    we can pass it directly*/
    : Promise< {msg: string } | any> => {
        try {
            if (AuthUtil.isSetTokenToHeader()) {
                let {addressId} = payload
                const response = await UserService.deleteAddress(addressId);
                return response.data;
            }
        } catch (error: any) {
            if (!error.response) {
                throw error 
            }
            return rejectWithValue(error)
        }
    });