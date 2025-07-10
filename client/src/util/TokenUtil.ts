import { APP_CONSTANTS } from "../constants";
export class TokenUtil{

    // private static SESSION_TOKEN_KEY:string = "contact-mgr-react-jwt-token-key";

    public static saveToken(token:string):void{
        sessionStorage.setItem(APP_CONSTANTS.REACT_E_COMMERCE_TOKEN,token);
    }

    public static getToken():string | null{
        return sessionStorage.getItem(APP_CONSTANTS.REACT_E_COMMERCE_TOKEN);
    }

    public static isLoggedIn():boolean{
        const token = this.getToken();
        return !!token;
    }

    public static deleteToken():void{
        sessionStorage.removeItem(APP_CONSTANTS.REACT_E_COMMERCE_TOKEN);
    }

}