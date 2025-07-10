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


// city.actions.ts

import { createAction } from "@reduxjs/toolkit";

export const getCity = createAction<string>("city/getCity");

export {}; // Empty export statement to mark the file as a module
