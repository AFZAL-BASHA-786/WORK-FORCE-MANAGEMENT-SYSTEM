import {Response, Router, Request} from "express";
import {body} from 'express-validator';
import { validateForm } from "../middlewares/ValidateForm";
import * as categoryController from "../controllers/categoryController"
import { authMiddleware } from "../middlewares/authMiddleware";
import * as productController from "../controllers/productController"

const productRouter: Router = Router();

/**
 * @usage : Create a product
 * @method : POST
 * @url : http://localhost:9000/api/products/
 * @access : PRIVATE
 * @param : title, description, brand, imageUrl, price, quantity,categoryId,subCategoryId 
 * @param request
 * @param response
 */ 

productRouter.post('/', [
    body('employeename').isLength({min: 5}).withMessage("EmployeeName is required"),
    body('email').isEmail().withMessage("Proper Email is required"),
    body('imageUrl').not().isEmpty().withMessage("imageUrl is required"),
    body('mobile').not().isEmpty().withMessage("mobile is required"),
    body('price').not().isEmpty().withMessage("Price is required"),
    body('flat').not().isEmpty().withMessage("flat is required"),
    body('street').not().isEmpty().withMessage("street is required"),
    body('city').not().isEmpty().withMessage("city is required"),
    body('state').not().isEmpty().withMessage("state is required"),
    body('country').not().isEmpty().withMessage("country is required"),
    body('pinCode').not().isEmpty().withMessage("pinCode is required"),
    body('categoryId').not().isEmpty().withMessage("categoryId is required"),
    body('subCategoryId').not().isEmpty().withMessage("subCategoryId is required"),
], validateForm,authMiddleware, async (request: Request, response: Response) => {
    await productController.createProduct(request, response);
}); 

/**
 * @usage : Update a product
 * @method : PUT
 * @url : http://localhost:9000/api/products/:productId
 * @access : PRIVATE
 * @param : title, description, brand, imageUrl, price, quantity,categoryId,subCategoryId 
 * @param request
 * @param response
 */ 



productRouter.put('/:productId', [
    body('employeename').isLength({min: 5}).withMessage("EmployeeName is required"),
    body('email').isEmail().withMessage("Proper Email is required"),
    body('imageUrl').not().isEmpty().withMessage("imageUrl is required"),
    body('price').not().isEmpty().withMessage("Price is required"),
    body('flat').not().isEmpty().withMessage("flat is required"),
    body('street').not().isEmpty().withMessage("street is required"),
    body('city').not().isEmpty().withMessage("city is required"),
    body('state').not().isEmpty().withMessage("state is required"),
    body('country').not().isEmpty().withMessage("country is required"),
    body('pinCode').not().isEmpty().withMessage("pinCode is required"),
    body('categoryId').not().isEmpty().withMessage("categoryId is required"),
    body('subCategoryId').not().isEmpty().withMessage("subCategoryId is required"),
], validateForm,authMiddleware, async (request: Request, response: Response) => {
    await productController.updateProduct(request, response);
});

/* productRouter.put('/quantity/:productId/:quantity',validateForm,authMiddleware, async (request: Request, response: Response) => {
    await productController.updateProductQuantity(request, response);
}); */


/**
 * @usage : Get all Products
 * @method : GET
 * @url : http://localhost:9000/api/products/
 * @access : PUBLIC
 * @param : no params
 * @param request
 * @param response
 */ 

productRouter.get('/', authMiddleware, async (request: Request, response: Response) => {
    await productController.getAllProducts(request, response);
});

/**
 * @usage : Get a Product
 * @method : GET
 * @url : http://localhost:9000/api/products/:productId
 * @access : PUBLIC
 * @param : no params
 * @param request
 * @param response
 */ 

productRouter.get('/:productId', authMiddleware, async (request: Request, response: Response) => {
    await productController.getProduct(request, response);
});

/**
 * @usage : Delete a Product
 * @method : DELETE
 * @url : http://localhost:9000/api/products/:productId
 * @access : PUBLIC
 * @param : no params
 * @param request
 * @param response
 */ 

productRouter.delete('/:productId', authMiddleware, async (request: Request, response: Response) => {
    await productController.deleteProduct(request, response);
});

/* Get all products of a particular category like household categoryId */
/*Eg:  All Houshold products */
/**
 * @usage : Get all Products with categoryId
 * @method : GET
 * @url : http://localhost:9000/api/products/categories/:categoryId
 * @access : PUBLIC
 * @param : no params
 * @param request
 * @param response
 */ 

productRouter.get('/categories/:categoryId', authMiddleware, async (request: Request, response: Response) => {
    await productController.getAllProductsWithCategoryId(request, response);
});

export default productRouter;

