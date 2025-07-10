import {createSlice, isRejectedWithValue, SerializedError} from "@reduxjs/toolkit";
import {ToastUtil} from "../../util/ToastUtil";
import * as userActions from "./user.actions";
import {TokenUtil} from "../../util/TokenUtil";
import { UserView } from "../../modules/users/models/UserView";
import { AddressView } from "../../modules/users/models/AddressView";

export const userFeatureKey = "userFeature";

export interface InitialState {
    loading: boolean;
    errorMessage: SerializedError;
    user: UserView;
    token: string;
    isAuthenticated: boolean;
    address: AddressView
}

const initialState: InitialState = {
    loading: false,
    errorMessage: {} as SerializedError,
    user: {} as UserView,
    token: "",
    isAuthenticated: false,
    address: {} as AddressView
};

export const userSlice = createSlice({
    name: 'userSlice',
    initialState: initialState,
    reducers: {
        logOffAction: (state) => {
            state.user = {} as UserView;
            state.token = "";
            state.isAuthenticated = false;
            TokenUtil.deleteToken();
            ToastUtil.displaySuccessToast("LogOff is Success!");
        },
        userLogOutAction: (state) => {
            state.user = {} as UserView;
            state.token = "";
            state.isAuthenticated = false;
            TokenUtil.deleteToken();
            ToastUtil.displayInfoToast("LogOut is Success!");
        }
    },
    extraReducers: (builder) => {
        // Register a user
        builder.addCase(userActions.registerUserAction.pending, (state) => {
            state.loading = true;
        }).addCase(userActions.registerUserAction.fulfilled, (state, action) => {
            state.loading = false;  
            // console.log(action.payload);
            // console.log(action.payload.user);
            ToastUtil.displaySuccessToast(action.payload.msg);
        }).addCase(userActions.registerUserAction.rejected, (state, action) => {
            state.loading = false;
            /* isRejectedWithValue if from redux toolkit and catches 
                error msg from rejectWithValue in user.actions */
            if (isRejectedWithValue(action)) {
                // state.errorMessage = action.payload
                // console.log(action.payload);
                ToastUtil.displayErrorToast(`Account Already Exists`);
                // ToastUtil.displayErrorToast(`Registration Failed`);
            }
        })

        // login user
        .addCase(userActions.loginUserAction.pending, (state) => {
            state.loading = true;
        }).addCase(userActions.loginUserAction.fulfilled, (state, action) => {
            state.loading = false;
            state.user = action.payload.user;
            state.isAuthenticated = true;
            state.token = action.payload.token;
            TokenUtil.saveToken(action.payload.token); // saves the token in session storage
            // console.log(action.payload)
            ToastUtil.displaySuccessToast(action.payload.msg);
        }).addCase(userActions.loginUserAction.rejected, (state, action) => {
            state.loading = false;
            state.user = {} as UserView;
            state.isAuthenticated = false;
            state.token = "";            
            TokenUtil.deleteToken();
            if (isRejectedWithValue(action)) {
                // state.errorMessage = action.payload
                // console.log(action.payload);
                ToastUtil.displayErrorToast(`${action.payload.msg} Log In Failed`);
                // ToastUtil.displayErrorToast("Log In Fauled");
            }
        })

        // get user info
        .addCase(userActions.getUserInfoAction.pending, (state) => {
            state.loading = true;
        }).addCase(userActions.getUserInfoAction.fulfilled, (state, action) => {
            state.loading = false;
            state.user = action.payload?.user || {};
            state.isAuthenticated = true;
        }).addCase(userActions.getUserInfoAction.rejected, (state, action) => {
            state.loading = false;
            state.user = {} as UserView;
            // state.isAuthenticated = false;
            if (isRejectedWithValue(action)) {
                state.errorMessage = action.payload.msg
                // console.log(action.payload);
                // ToastUtil.displayErrorToast('Get User Info Failed');
                ToastUtil.displayErrorToast(`${action.payload.status} ${action.payload.msg} Get User Info Failed`)
            }
        })

        // upload Profile Picture
        .addCase(userActions.updateProfilePictureAction.pending, (state) => {
            state.loading = true;
        }).addCase(userActions.updateProfilePictureAction.fulfilled, (state, action) => {
            state.loading = false;
            state.user = action.payload?.user || {};
            ToastUtil.displaySuccessToast("Profile Image is Uploaded");
        }).addCase(userActions.updateProfilePictureAction.rejected, (state, action) => {
            state.loading = false;
            if (isRejectedWithValue(action)) {
                ToastUtil.displayErrorToast(`Profile Upload is Failed`)
            }
        })

        // change Password Action
        .addCase(userActions.changePasswordAction.pending, (state) => {
            state.loading = true;
        }).addCase(userActions.changePasswordAction.fulfilled, (state, action) => {
            state.loading = false;
            state.user = action.payload?.user || {};
            ToastUtil.displaySuccessToast(action.payload.msg);
        }).addCase(userActions.changePasswordAction.rejected, (state, action) => {
            state.loading = false;
            if (isRejectedWithValue(action)) {
                ToastUtil.displayErrorToast(`Change Password is Failed`)
            }
        })

/* //!-- ----------------------------------- ADDRESS ---------------------------------------*/
        // Create Address
        .addCase(userActions.createNewAddressAction.pending, (state) => {
            state.loading = true;
        }).addCase(userActions.createNewAddressAction.fulfilled, (state, action) => {
            state.loading = false;
            state.address = action.payload.address;
            ToastUtil.displaySuccessToast(action.payload.msg);
        }).addCase(userActions.createNewAddressAction.rejected, (state, action) => {
            state.loading = false;
            if (isRejectedWithValue(action)) {
                ToastUtil.displayErrorToast(`Address Creation is Failed`)
            }
        })

        // Update Address
        .addCase(userActions.updateAddressAction.pending, (state) => {
            state.loading = true;
        }).addCase(userActions.updateAddressAction.fulfilled, (state, action) => {
            state.loading = false;
            state.address = action.payload.address;
            ToastUtil.displaySuccessToast(action.payload.msg);
        }).addCase(userActions.updateAddressAction.rejected, (state, action) => {
            state.loading = false;
            if (isRejectedWithValue(action)) {
                ToastUtil.displayErrorToast(`Address Updation is Failed`)
            }
        })

        // Get Address
        .addCase(userActions.getAddressAction.pending, (state) => {
            state.loading = true;
        }).addCase(userActions.getAddressAction.fulfilled, (state, action) => {
            state.loading = false;
            state.address = action.payload; /* Here payload itself address */
        }).addCase(userActions.getAddressAction.rejected, (state, action) => {
            state.loading = false;
            if (isRejectedWithValue(action)) {
            }
        })

        // Delete Address
        .addCase(userActions.deleteAddressAction.pending, (state) => {
            state.loading = true;
        }).addCase(userActions.deleteAddressAction.fulfilled, (state, action) => {
            state.loading = false; 
            state.address = {} as AddressView;
            ToastUtil.displayInfoToast(action.payload.msg);
        }).addCase(userActions.deleteAddressAction.rejected, (state, action) => {
            state.loading = false;
            if (isRejectedWithValue(action)) {
                ToastUtil.displayErrorToast(`Unable to delete the Address`)
            }
        })
    }
});
export const {logOffAction,userLogOutAction} = userSlice.actions;