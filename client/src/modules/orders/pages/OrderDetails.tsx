import React from 'react';
import FinalNavbar from '../../layout/pages/navbar/FinalNavBar';
import LayoutHeading from '../../layout/components/layout-heading/LayoutHeading';
import { Container,Row,Col, ListGroup, Button } from 'react-bootstrap';
import orderImg from "../../../assets/img/order-success.png"
import { Link } from 'react-router-dom';
import * as orderReducer from "../../../redux/orders/orders.reducer"
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import SpinnerUI from '../../ui/components/SpinnerUI';

const OrderDetails: React.FC = () =>{

    const orderState:orderReducer.InitialState = useSelector((state:RootState)=>{
        return state[orderReducer.orderFeatureKey];
    }) 

    const {loading,order} = orderState;

    return (
        <>
            {loading && <SpinnerUI/>}
            <FinalNavbar/>
            <LayoutHeading heading='Appointment Details' color='text-success'/>
            {
                order && Object.keys(order).length>0 &&
                <Container>
                    <Row>
                        <Col xs={3}>
                            <img src={orderImg} alt="" className=' rounded-circle img-fluid'/>
                        </Col>
                        <Col xs={8}>
                            <ListGroup>
                                <ListGroup.Item className=" fw-bold text-success">
                                    <p >Appointment Placed Successfully</p>
                                </ListGroup.Item>
                                <ListGroup.Item >
                                    Appointment Number : <span className=' fw-bold'>{order._id}</span>
                                </ListGroup.Item>
                                <ListGroup.Item >
                                    Total Amount : <span className=' fw-bold'>&#8377;{Number(order.grandTotal).toFixed(2)}</span>
                                </ListGroup.Item>
                                <ListGroup.Item >
                                    Appointment Status : <span className=' fw-bold'>Appointment Placed</span>
                                </ListGroup.Item>
                                {/* <ListGroup.Item >
                                    Payment Mode : <span className=' fw-bold'>{order.paymentType}</span>
                                </ListGroup.Item> */}
                            </ListGroup>
    
                            <Link to={"/products/fashion"}>
                                <Button variant='warning' className=' mt-3'> Continue Booking</Button>
                            </Link>
                        </Col>
                    </Row>
                </Container> 
            }
        </>
    )
}

export default OrderDetails;