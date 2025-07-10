import axios from "axios";
import { Cities } from "../models/Cities";


export class CityService{
    private static serverUrl:string = process.env.REACT_APP_EXPRESS_SERVER_URL ? process.env.REACT_APP_EXPRESS_SERVER_URL : "";

    
    public static getCity(city : Cities)
    : Promise<{data:{msg: string, city: Cities}}>
    {
        let dataUrl = `${this.serverUrl}/api/cities/`
        return axios.post(dataUrl,city);
    }
}
    // /* PRIVATE means we cant create without login so verify whether token is there/not*/
    // public static updateProduct(product: ProductRequestView,productId: string)
    // : Promise<{data: {msg:string,product: ProductResponseView}}>
    // {
    //     let dataUrl = `${this.serverUrl}/api/products/${productId}`;
    //     return axios.put(dataUrl,product);
    // }
    // /* PRIVATE means we cant create without login so verify whether token is there/not*/
    // public static getAllProducts():Promise<{data:ProductResponseView[]}>{
    //     let dataUrl = `${this.serverUrl}/api/products/`;
    //     return axios.get(dataUrl);
    // }
    // /* PRIVATE means we cant create without login so verify whether token is there/not*/
    // public static getProduct(productId:string):Promise<{data:ProductResponseView}>{
    //     let dataUrl = `${this.serverUrl}/api/products/${productId}`;
    //     return axios.get(dataUrl);
    // }
    // /* PRIVATE means we cant create without login so verify whether token is there/not*/
    // public static deleteProduct(productId:string):Promise<{data:{msg:string}}>{
    //     let dataUrl = `${this.serverUrl}/api/products/${productId}`;
    //     return axios.delete(dataUrl);
    // }
    // /* PRIVATE means we cant create without login so verify whether token is there/not*/
    // public static getAllProductsWithCategoryId(categoryId:string):Promise<{data:ProductResponseView[]}>{
    //     let dataUrl = `${this.serverUrl}/api/products/categories/${categoryId}`;
    //     return axios.get(dataUrl);
    // }

    // /* public static updateProductQuantity(productId: string,quantity: string)
    // : Promise<{data: {msg:string,product: ProductResponseView}}>
    // {
    //     let quant = quantity;
    //     let dataUrl = `${this.serverUrl}/api/products/${productId}/${quant}`;
    //     return axios.put(dataUrl);
    // } */
// }