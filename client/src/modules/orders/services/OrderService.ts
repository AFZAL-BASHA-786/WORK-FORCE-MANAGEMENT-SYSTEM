import axios from "axios";
import { OrderRequestView } from "../models/OrderRequestView";
import { OrderResponseView } from "../models/OrderResponseView";

export class OrderService {
    private static serverUrl: string = 
    process.env.REACT_APP_EXPRESS_SERVER_URL ? process.env.REACT_APP_EXPRESS_SERVER_URL : "";

    // PRIVATE
    public static placeOrder(order: OrderRequestView):
     /* order: OrderRequestView doesnot written inside of {} because from orders.actions 
     we get order without mentioning paranthesis see below
     OrderService.placeOrder(order) */
     Promise<{ data: { msg: string, order: OrderResponseView } }> {
        const dataUrl: string = `${this.serverUrl}/api/orders/place`;
        return axios.post(dataUrl, order);
        /* here axios.post brings { msg: string, order: OrderResponseView } this object data and
            inserts into another object which consists of one field called data. 
            { data: serverResponse} and this is catched as response by placeOrderAction
            here serverResponse means the what is returned inside of json 
            i.e response.status(200).json(serverResponse) */
    }

    public static getAllOrders():
     Promise<{ data: OrderResponseView[] }> {
        const dataUrl: string = `${this.serverUrl}/api/orders/all`;
        return axios.get(dataUrl);
    }

    public static getMyOrders():
     Promise<{ data: OrderResponseView[] }> {
        const dataUrl: string = `${this.serverUrl}/api/orders/me`;
        return axios.get(dataUrl);
    } 
    
    public static updateOrderStatus(orderStatus: string,orderId: string):
    Promise<{ data: { msg: string, order: OrderResponseView } }> {
       const dataUrl: string = `${this.serverUrl}/api/orders/${orderId}`;
       return axios.post(dataUrl, {orderStatus: orderStatus});
   }
        
}