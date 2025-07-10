import axios from "axios";
import { UserView } from "../models/UserView";
import { AddressView } from "../models/AddressView";

export class UserService {
    private static serverUrl: string = 
    process.env.REACT_APP_EXPRESS_SERVER_URL ? process.env.REACT_APP_EXPRESS_SERVER_URL : "";

    /**
     * @usage : Register a User
     * @method : POST
     * @url : http://localhost:9000/users/register
     * @access : PUBLIC
     * @body : username, email, password
     * @param user
     */
    public static registerUser(user: UserView):
     Promise<{ data: { msg: string } }> {
        const dataUrl: string = `${this.serverUrl}/api/users/register`;
        return axios.post(dataUrl, user);
    }

    /**
     * @usage : Login a User
     * @method : POST
     * @url : http://localhost:9000/users/login
     * @access : PUBLIC
     * @body : email, password
     * @param user
     */
    public static loginUser(user: UserView): 
    Promise<{ data: { msg: string,  user: UserView, token: string } }> {
        const dataUrl: string = `${this.serverUrl}/api/users/login`;
        return axios.post(dataUrl, user);
    }

    /**
     * @usage : get User Info
     * @method : GET
     * @url : http://localhost:9000/users/me
     * @access : PRIVATE
     */
    public static getUserInfo(): Promise<{ data: { data: UserView } }> {
        const dataUrl: string = `${this.serverUrl}/api/users/me`;
        return axios.get(dataUrl);
    }
    // PRIVATE
    public static updateProfilePicture(imageUrl:string): Promise<{ data: { user: UserView } }> {
        const dataUrl: string = `${this.serverUrl}/api/users/profile`;
        return axios.post(dataUrl,{imageUrl}); // 
        /* we should not pass string thats y imagerl is passed like object {imageUrl}
            If u see user is an object. That's y in above loginUser itis provided directly as user but not like
            {user}
        */
    }
    // PRIVATE
    public static changePassword(password:string): Promise<{ data: { user: UserView,msg: string } }> {
        const dataUrl: string = `${this.serverUrl}/api/users/change-password`;
        return axios.post(dataUrl,{password}); // 
        /* we should not pass string thats y password is passed like object {password}
            If u see user is an object. That's y in above loginUser itis provided directly as user but not like
            {user}
        */
    }

    /* //! ------------------------------ ADDRESS ------------------------------*/

    // PRIVATE
    public static createNewAddress(address:AddressView): Promise<{ data: { address:AddressView,msg: string } }> {
        let dataUrl: string = `${this.serverUrl}/api/addresses/new`;
        /* return axios.post(dataUrl,address); */ 
        return axios.post(dataUrl,address);
    }

    // PRIVATE
    public static updateAddress(address:AddressView,addressId: string): Promise<{ data: { address:AddressView,msg: string } }> {
        let dataUrl: string = `${this.serverUrl}/api/addresses/${addressId}`;
        /* return axios.post(dataUrl,address); */ 
        return axios.put(dataUrl,address);
    }

    // PRIVATE
    public static getAddress(): Promise<{ data: AddressView }> {
        let dataUrl: string = `${this.serverUrl}/api/addresses/me`;
        return axios.get(dataUrl);
    }

    // PRIVATE
    public static deleteAddress(addressId :string): Promise<{ data: {msg: string }}> {
        let dataUrl: string = `${this.serverUrl}/api/addresses/${addressId}`;
        return axios.delete(dataUrl);
    }
}