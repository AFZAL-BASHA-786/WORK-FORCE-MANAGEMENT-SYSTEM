import React, { useEffect, useState } from 'react';
import FinalNavbar from '../../layout/pages/navbar/FinalNavBar';
import LayoutHeading from '../../layout/components/layout-heading/LayoutHeading';
import { Container, Row, Col, Card, Table, ListGroup, ListGroupItem, Button } from 'react-bootstrap';
import * as cartReducer from "../../../redux/cart/cart.reducer";
import * as cartActions from "../../../redux/cart/cart.actions";
import { AppDispatch, RootState, useAppDispatch } from '../../../redux/store';
import { useSelector } from 'react-redux';
import NoProductFound from '../../ui/components/NoProductFound';
import { CartProduct, CartRequestView } from '../models/CartRequestView';
import { useNavigate } from 'react-router-dom';
import SpinnerUI from '../../ui/components/SpinnerUI';
import { ProductResponseView } from '../../products/models/ProductResponseView';
import { ProductsEntity } from '../models/CartResponseView';
import * as productActions from "../../../redux/products/product.actions"
import * as productReducer from "../../../redux/products/product.reducer"

const CartPage = ()=>{
    const dispatch:AppDispatch = useAppDispatch();
    const PRODUCT_TAX:number = 5.0;
    const navigate = useNavigate();
    const [products,setProducts] = useState<ProductResponseView[]>([])
    /* get cart count form redux */
    const cartState:cartReducer.InitialState = useSelector((state: RootState)=>{
        return state[cartReducer.cartFeatureKey];
    })
    
    /* const productQuantityState =  */

    const {loading,products:productRedux,cart} = cartState;

    // let clickDecrCount = (productId:string) => {
    //     dispatch({
    //         type: `${cartReducer.decrementCartProductCount}`,
    //         payload: {productId:productId}
    //     })
    // }

    const productQuantityState: productReducer.InitialState  = useSelector((state:RootState)=>{
        return state[productReducer.productFeatureKey]
    })

    let {product} = productQuantityState

    // let clickIncrCount = (productId:string) => {
    //     dispatch(productActions.getProductAction({productId:productId}))
    //     if(product){
    //         dispatch({
    //             type: `${cartReducer.incrementCartProductCount}`,
    //             payload: {productId:productId,quantity: 1}
    //         })  
    //     }
    // }

    let clickDeleteProduct = (productId: string)=>{
        dispatch({
            type: `${cartReducer.deleteProductFromCart}`,
            payload: {productId : productId}
        })
    }

    let calculateTotal = ():number=>{
        let total:number = 0;
        for(let product of products){
            total += (Number(product.price) * Number(1))
        }
        return total;
    }

    let calculateTax = ():number=>{
        return calculateTotal()*PRODUCT_TAX/100;
    }

    let calculateGrandTotal = ():number=>{
        return calculateTotal() + calculateTax();
    }

    const clickCheckOut = ()=>{
        const cartProds: CartProduct[] = products.map((item)=>{
            return {
                product: item._id,
                count: 1,
                price: 1 * Number(item.price)
            }
        })
        /* Below cartProducts is a single object. cartProduct is correct name.
        But i have written cartProducts mistakenly but now i dont want to change it*/
        const cartProducts: CartRequestView = {
            products : cartProds,
            total: calculateTotal(),
            tax: calculateTax(),
            grandTotal: calculateGrandTotal()
        };
        dispatch(cartActions.createCartAction(cartProducts)).then((response:any)=>{
            if(!response.error){
                navigate("/cart/checkout")
            }
        })
    }

    useEffect(()=>{
        dispatch(cartActions.getCartInfoAction())
    },[dispatch])

    useEffect(()=>{
        setProducts(productRedux);
    },[productRedux])

    /* useEffect(()=>{
        if(cart.products){
            const productList: ProductsEntity[] = cart.products;
            const theProducts: ProductResponseView[] = productList.map((item) =>{
                return {
                    _id: item.product._id,
                    title: item.product.title,
                    description: item.product.description,
                    brand: item.product.brand,
                    imageUrl: item.product.imageUrl,
                    price: item.product.price.toString(),
                    quantity: item.product.quantity.toString(),
                    count: item.count,
                    sold: 0,
                    userObj: cart.userObj,
                }
            })
            setProducts(theProducts);
        }
    },[cart]) */

    return (
        <>
            {loading && <SpinnerUI/>}
            <FinalNavbar/>
            <LayoutHeading heading='Appointments Page' color='text-success'/>
            {
                products.length === 0 && <NoProductFound/>
            }
            {
                products && products.length> 0 &&
                <>
                    <Container className='mt-3'>
                        <Row>
                            <Col xs={9}>
                                <Card className=' shadow-lg'>
                                    <Card.Header className=' bg-success'>
                                        <p className="h3 text-white">Selected Worker</p>
                                    </Card.Header>
                                    <Card.Body className=' bg-light-success'>
                                        <Table striped hover className=' text-center'>
                                            <thead className=' table-warning' >
                                                <tr >
                                                    <th>SNo</th>
                                                    <th>Image</th>
                                                    <th>Title</th>
                                                    <th>Price</th>
                                                    <th>Total</th>
                                                    <th>Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    products && products.length>0 &&
                                                    products.map((product,index)=>{
                                                        return (
                                                            <tr key={index}>
                                                                <td>{index+1}</td>
                                                                <td><img src={product.imageUrl} width={50} height={50} alt="" /></td>
                                                                <td>{product.employeename}</td>
                                                                <td>{product.price}</td>
                                                                {/* <td>
                                                                    <i className="bi bi-dash-circle-fill me-1 text-success" onClick={()=>clickDecrCount(product._id)}></i>
                                                                    {1}
                                                                    <i className="bi bi-plus-circle-fill ms-1 text-success" onClick={()=>clickIncrCount(product._id)}></i>
                                                                </td> */}
                                                                <td>{Number(product.price)}</td>
                                                                {/* <td>{+(product.price)*(product.count? product.count : 1)}</td> + means Number */}
                                                                <td>
                                                                    <Button variant={"danger"}>
                                                                        <i className="bi bi-trash-fill" onClick={()=>clickDeleteProduct(product._id)}></i>
                                                                    </Button>
                                                                </td>
                                                            </tr>
                                                        )
                                                    })
                                                }
                                            </tbody>
                                        </Table>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col xs={3}>
                                <Card className=' shadow-lg'>
                                    <Card.Header className=' bg-success'>
                                        <p className="h3 text-white">Your Total</p>
                                    </Card.Header>
                                    <Card.Body>
                                        <ListGroup>
                                            <ListGroupItem>Total : <span className=' fw-bold'>&#8377;{calculateTotal().toFixed(2)}</span></ListGroupItem>
                                            <ListGroupItem>Tax : <span className=' fw-bold'>&#8377;{calculateTax().toFixed(2)}</span></ListGroupItem>
                                            <ListGroupItem>Grand Total : <span className=' fw-bold'>&#8377;{calculateGrandTotal().toFixed(2)}</span></ListGroupItem>

                                        </ListGroup>
                                        <div className="d-grid mt-2">
                                            <Button variant="warning" size="sm" onClick={clickCheckOut}>
                                                    Check Out
                                            </Button>
                                        </div>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                    </Container>
                </>
            }
        </>
    )
}

export default CartPage;