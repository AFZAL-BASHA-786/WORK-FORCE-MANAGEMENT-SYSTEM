import mongoose from "mongoose";

export interface IProduct{
    _id? : string;
    employeename: string;
    email: string;
    imageUrl: string;
    mobile: string;
    price : number;
    flat: string;
    street: string;
    city: string;
    state: string;
    country: string;
    pinCode: string;
    userObj : mongoose.Schema.Types.ObjectId;
    categoryObj : mongoose.Schema.Types.ObjectId;
    subCategoryObj : mongoose.Schema.Types.ObjectId;
    createdAt? : Date;
    updatedAt? : Date;
}