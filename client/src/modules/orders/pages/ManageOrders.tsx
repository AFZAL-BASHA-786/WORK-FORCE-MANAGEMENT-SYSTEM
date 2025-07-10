import React, { useEffect, useState } from 'react';
import FinalNavbar from '../../layout/pages/navbar/FinalNavBar';
import LayoutHeading from '../../layout/components/layout-heading/LayoutHeading';
import { Container,Row,Col, Table, Form, Button } from 'react-bootstrap';
import * as orderReducer from "../../../redux/orders/orders.reducer"
import * as orderActions from "../../../redux/orders/orders.actions"
import { useSelector } from 'react-redux';
import { AppDispatch, RootState, useAppDispatch } from '../../../redux/store';
import SpinnerUI from '../../ui/components/SpinnerUI';
import NoProductFound from '../../ui/components/NoProductFound';
import { OrderUtil } from '../../../util/OrderUtil';

const ManageOrders: React.FC = () =>{

    const dispatch:AppDispatch = useAppDispatch();

    const [newStatus,setNewStatus] = useState<{orderId:string,orderStatus: string}>({
        orderId: "",
        orderStatus: ""
    });
    const orderState:orderReducer.InitialState = useSelector((state:RootState)=>{
        return state[orderReducer.orderFeatureKey];
    }) 

    const {loading,orders} = orderState;

    const updateInput= (event: React.ChangeEvent<any>,orderId: string)=>{
        if(orderId){
            setNewStatus({
                orderId: orderId,
                orderStatus: event.target.value
            })
        }
    }

    /* Initially Loads the orders */
    useEffect(()=>{
        dispatch(orderActions.getAllOrdersAction())
    },[])

    const clickUpdateStatus = (orderId:string) => {
        if(orderId){
            /* why we are checking below condition means suppose assume we change the status 
                from processing to delivered and later we press the update button of another product
                then it will make the other product status as delevired. so to make connection between 
                both we are checking */
            if(newStatus.orderId === orderId){
                const newOrderStatus = {
                    orderId : orderId ,
                    orderStatus: newStatus.orderStatus
                }
                dispatch(orderActions.updateOrderStatusAction(newOrderStatus)).then((response:any)=>{
                    if(!response.error){
                        dispatch(orderActions.getAllOrdersAction())
                    }
                });
            }
        }
    }

    return (
        <>
            {loading && <SpinnerUI/>}
            <FinalNavbar/>
            <LayoutHeading heading='Manage Appointments' color='text-success'/>
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
                                            <th>Customer Name</th>
                                            <th>Total Amount</th>
                                            <th>Payment Type</th>
                                            <th>Order Status</th>
                                            <th>Status</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            orders.map((order)=>{
                                                return (
                                                    <tr key={order._id}>
                                                        <td>{order._id}</td>
                                                        <td>{new Date(order.createdAt).toLocaleDateString()} {new Date(order.createdAt).toLocaleTimeString()}</td>
                                                        <td>{order.orderBy?.username}</td>
                                                        {/* <td>{order.orderBy?._id}</td> */}
                                                        <td>&#8377;{Number(order.grandTotal).toFixed(2)}</td>
                                                        <td>{order.paymentType}</td>
                                                        <td className=' fw-bold'>{order.orderStatus}</td>
                                                        <td>
                                                            <Form.Select onChange={e=>updateInput(e,order._id)}>
                                                                {
                                                                    OrderUtil.getOrderStatuses().map((item,index)=>{
                                                                        return (
                                                                            <option value={item}>{item}</option>
                                                                        )
                                                                    })
                                                                }
                                                            </Form.Select>
                                                        </td>
                                                        <td>
                                                            <Button variant='warning' onClick={()=>clickUpdateStatus(order._id)}>Update</Button>
                                                        </td>
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

export default ManageOrders;