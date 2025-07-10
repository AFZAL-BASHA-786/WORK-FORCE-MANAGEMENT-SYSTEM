import mongoose from "mongoose";
import { IProduct } from "../models/IProduct";

const productSchema = new mongoose.Schema<IProduct>({
    employeename: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    imageUrl: {type: String, required: true},
    mobile: {type: String, required: true},
    price: {type: Number, required: true},
    flat: {type: String, required: true},
    street: {type: String, required: true},
    city: {type: String, required: true},
    state: {type: String, required: true},
    country: {type: String, required: true},
    pinCode: {type: String, required: true},
    userObj : {type: mongoose.Schema.Types.ObjectId, required: true,ref:"users" },
    categoryObj : {type: mongoose.Schema.Types.ObjectId, required: true,ref:"categories"},
    subCategoryObj : {type: mongoose.Schema.Types.ObjectId, required: true,ref:"subCategories"},
}, {timestamps: true});

const ProductCollection = mongoose.model<IProduct>("products", productSchema);
export default ProductCollection;