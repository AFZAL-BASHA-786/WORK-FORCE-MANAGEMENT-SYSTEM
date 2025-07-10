import {Response, Router, Request} from "express";
import { body } from "express-validator";

const cityRouter: Router = Router();

/**
 * @usage : Create New Address
 * @method : POST
 * @url : http://localhost:9000/api/addresses/new
 * @access : PRIVATE
 * @params : name, email, mobile, address, Landmark, street, city, state, country, pincode
 */ 

cityRouter.post('/', [
    body('city').not().isEmpty().withMessage("mobile is required"),
], async (request: Request, response: Response) => {

    let {city} = request.body;

    return response.status(200).json({
        msg:"Address Is Created",
        city: city
    })
});


export default cityRouter;