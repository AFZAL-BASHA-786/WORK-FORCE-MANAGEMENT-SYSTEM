import React, { useEffect } from 'react';
import FinalNavbar from '../../layout/pages/navbar/FinalNavBar';
import LayoutHeading from '../../layout/components/layout-heading/LayoutHeading';
import { Container,Row,Col, Table } from 'react-bootstrap';
import * as orderReducer from "../../../redux/orders/orders.reducer"
import * as orderActions from "../../../redux/orders/orders.actions"
import { useSelector } from 'react-redux';
import { AppDispatch, RootState, useAppDispatch } from '../../../redux/store';
import SpinnerUI from '../../ui/components/SpinnerUI';
import NoProductFound from '../../ui/components/NoProductFound';

const YourOrders: React.FC = () =>{

    const dispatch:AppDispatch = useAppDispatch();

    const orderState:orderReducer.InitialState = useSelector((state:RootState)=>{
        return state[orderReducer.orderFeatureKey];
    }) 

    const {loading,orders} = orderState;

    useEffect(()=>{
        dispatch(orderActions.getMyOrdersAction())
    },[])

    return (
        <>
            {loading && <SpinnerUI/>}
            <FinalNavbar/>
            <LayoutHeading heading='Your Appointments' color='text-success'/>
            {
                orders && orders.length> 0 ? 
                <>
                    <Container>
                        <Row>
                            <Col>
                                <Table striped hover className=' text-center shadow-lg'>
                                    <thead className='table-success text-white'>
                                        <tr>
                                            <th>Appointment Number</th>
                                            <th>Appointment Placed On</th>
                                            {/* <th>Order By</th> */}
                                            <th>Total Amount</th>
                                            {/* <th>Payment Type</th> */}
                                            <th>Appointment Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            orders.map((order)=>{
                                                return (
                                                    <tr key={order._id}>
                                                        <td>{order._id}</td>
                                                        <td>{new Date(order.createdAt).toLocaleDateString()} {new Date(order.createdAt).toLocaleTimeString()}</td>
                                                        {/* <td>{order.orderBy?.username}</td> */}
                                                        <td>&#8377;{Number(order.grandTotal).toFixed(2)}</td>
                                                        {/* <td>{order.paymentType}</td> */}
                                                        <td className=' fw-bold'>{order.orderStatus}</td>
                                                    </tr>
                                                )
                                            })
                                        }
                                    </tbody>
                                </Table>
                            </Col>
                        </Row>
                    </Container>
                </>:
                <>
                    <NoProductFound/>
                </>
            }
        </>
    )
}

export default YourOrders;