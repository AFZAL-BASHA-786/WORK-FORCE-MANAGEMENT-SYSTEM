import React, { useEffect } from 'react';
import FinalNavbar from '../../layout/pages/navbar/FinalNavBar';
import LayoutHeading from '../../layout/components/layout-heading/LayoutHeading';
import { Container, Row, Col, Card, ListGroup, ListGroupItem, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import * as cartReducer from "../../../redux/cart/cart.reducer";
import { AppDispatch, RootState, useAppDispatch } from '../../../redux/store';
import { useSelector } from 'react-redux';
import NoProductFound from '../../ui/components/NoProductFound';
import * as userActions from "../../../redux/users/user.actions"
import * as userReducer from "../../../redux/users/user.reducer"
import SpinnerUI from '../../ui/components/SpinnerUI';
import { CartProduct } from '../models/CartRequestView';
import * as cartActions from "../../../redux/cart/cart.actions"
import { OrderRequestView } from '../../orders/models/OrderRequestView';
import * as orderActions from "../../../redux/orders/orders.actions"

const CheckOutPage = ()=>{
    const dispatch:AppDispatch = useAppDispatch();
    const PRODUCT_TAX:number = 5.0;
    let navigate = useNavigate();
    /* get cart count form redux */
    const cartState:cartReducer.InitialState = useSelector((state: RootState)=>{
        return state[cartReducer.cartFeatureKey];
    })

    const userState:userReducer.InitialState = useSelector((state: RootState)=>{
        return state[userReducer.userFeatureKey]
    }) 
    let {loading,address} = userState;
    let {products} = cartState;

    let calculateTotal = ():number=>{
        let total:number = 0;
        for(let product of products){
            total += (Number(product.price))
        }
        return total;
    }

    let calculateTax = ():number=>{
        return calculateTotal()*PRODUCT_TAX/100;
    }

    let calculateGrandTotal = ():number=>{
        return calculateTotal() + calculateTax();
    }

    useEffect(()=>{
        dispatch(userActions.getAddressAction())
    },[dispatch]) /* applying dispatch and testing */

    const clickPlaceOrder = ()=>{ 
        const cartProds: CartProduct[] = products.map((item)=>{
            return {
                product: item._id,
                count: 1,
                price: Number(item.price)
            }
        })
        /* Here orderProducts and cartProducts both are similar but only change is
        cartProducts dont contain paymentType thats y we simple added paymentType 
        in cartProducts and ordersStatus is optional. But be careful and check whther we are
        using OrderRequestView / CartRequestView */
        const cartProducts: OrderRequestView = {
            products : cartProds,
            total: calculateTotal(),
            tax: calculateTax(),
            grandTotal: calculateGrandTotal(),
            paymentType: "COD"
        };
        dispatch(orderActions.placeOrderAction(cartProducts)).then((response:any)=>{
            if(!response.error){
                navigate("/orders/details");
                dispatch({
                    type: `${cartReducer.clearCart}`
                })
            }
        })

    }

    return (
        <>
            { loading && <SpinnerUI/>}
            <FinalNavbar/>
            <LayoutHeading heading='CheckOut Deatils' color='text-success'/>
            {
                products.length === 0 && <NoProductFound/>
            }
            {
                products && products.length> 0 &&
                <>
                    <Container className='mt-3'>
                        <Row>
                            <Col xs={8}>
                            {
                                address && Object.keys(address).length>0 ?
                                    <Card className=' shadow-lg'>
                                        <Card.Header className=' bg-success'>
                                            <div className=' d-flex justify-content-between'>
                                                <p className="h3 text-white">Address</p>
                                                <Link to={`/users/edit-shipping-address/${address._id}`}>
                                                    <Button variant='info' className='me-2'>
                                                        <i className="bi bi-pencil-fill text-white"></i>
                                                    </Button>
                                                </Link>
                                            </div>
                                        </Card.Header>
                                    
                                        <Card.Body>
                                            <ListGroup>
                                                <ListGroupItem>Name : <span className=' fw-bold'>{address.name}</span></ListGroupItem>
                                                <ListGroupItem>Email : <span className=' fw-bold'>{address.email}</span></ListGroupItem>
                                                <ListGroupItem>Flat : <span className=' fw-bold'>{address.flat}</span></ListGroupItem>
                                                <ListGroupItem>Street : <span className=' fw-bold'>{address.street}</span></ListGroupItem>
                                                <ListGroupItem>Landmark : <span className=' fw-bold'>{address.landmark}</span></ListGroupItem>
                                                <ListGroupItem>City : <span className=' fw-bold'>{address.city}</span></ListGroupItem>
                                                <ListGroupItem>State : <span className=' fw-bold'>{address.state}</span></ListGroupItem>
                                                <ListGroupItem>Country : <span className=' fw-bold'>{address.country}</span></ListGroupItem>
                                                <ListGroupItem>PinCode : <span className=' fw-bold'>{address.pinCode}</span></ListGroupItem>
                                            </ListGroup>
                                        </Card.Body>
                                    </Card>:
                                        <Card>
                                            <Card.Body>
                                                <Link to={"/users/add-shipping-address"} className=' text-decoration-none text-success' >
                                                    <i className="bi bi-plus-circle-fill"></i> Add Shipping Address
                                                </Link>
                                            </Card.Body> 
                                        </Card>                                   
                            }
                            </Col>
                            <Col xs={4}>
                                <Card className=' shadow-lg'>
                                    <Card.Header className=' bg-success'>
                                        <p className="h3 text-white">Worker Description</p>
                                    </Card.Header>
                                    <Card.Body className=' bg-light-success'>
                                        <ListGroup>
                                            {
                                                products.map((item,index)=>{
                                                    return (
                                                        <ListGroupItem>
                                                            <Row>
                                                                <Col xs={3}>
                                                                    <img src={item.imageUrl} height={100} width={100} className=" img-fluid" alt="" />
                                                                </Col>
                                                                <Col xs={9}>
                                                                <small>{item.employeename}</small><br/>
                                                                <small>pinCode: {item.pinCode}</small><br/>
                                                                {/* Single Product Price even though if u buy two same mobiles it will shoe price of single mobile */}
                                                                <small>price: &#8377;{Number(item.price).toFixed(2)}</small>
                                                                {/* If u want to buy same product twice. then u have to write
                                                                    <small>price: &#8377;{(item.count*Number(item.price)).toFixed(2)}</small>  
                                                                    Now it displays as per the cart.                                                                       
                                                                */}
                                                                </Col>
                                                            </Row>
                                                        </ListGroupItem>
                                                    )
                                                })
                                            }
                                        </ListGroup>
                                        <ListGroup className='mt-3'>
                                            <ListGroupItem>Total : <span className=' fw-bold'>&#8377;{calculateTotal().toFixed(2)}</span></ListGroupItem>
                                            <ListGroupItem>Tax : <span className=' fw-bold'>&#8377;{calculateTax().toFixed(2)}</span></ListGroupItem>
                                            <ListGroupItem>Grand Total : <span className=' fw-bold'>&#8377;{calculateGrandTotal().toFixed(2)}</span></ListGroupItem>
                                        </ListGroup>
                                        <div className="d-grid mt-2">
                                            <Button variant="warning" size="sm" onClick={clickPlaceOrder}>
                                                Place Appointment
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

export default CheckOutPage;