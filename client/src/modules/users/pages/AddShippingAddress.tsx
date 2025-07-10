import React, { useState } from 'react';
import FinalNavbar from '../../layout/pages/navbar/FinalNavBar';
import LayoutHeading from '../../layout/components/layout-heading/LayoutHeading';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import * as userActions from "../../../redux/users/user.actions";
import { AppDispatch,RootState,useAppDispatch } from '../../../redux/store';
import * as userReducer from "../../../redux/users/user.reducer"
import { useSelector } from 'react-redux';
import SpinnerUI from '../../ui/components/SpinnerUI';
import { ToastUtil } from '../../../util/ToastUtil';
import { AddressView } from '../models/AddressView';
 

const AddShippingAddress : React.FC = () =>{ 

    const userState: userReducer.InitialState = useSelector((state:RootState)=>{
        return state[userReducer.userFeatureKey]
    })

    let {loading} = userState;

    const [validated, setValidated] = useState<boolean>(false);
    const dispatch : AppDispatch = useAppDispatch();
    const navigate = useNavigate();

    const [address,setAddress] = useState<AddressView>({
        mobile: "",
        flat: "",
        landmark: "",
        street: "",
        city: "",
        state: "",
        country: "",
        pinCode: ""
    });

    const updateInput = (event: React.ChangeEvent<HTMLInputElement> | any) => {
        setAddress({
            ...address,
            [event.target.name] : event.target.value 
        })
    }

    const handleSubmit = (event:React.FormEvent | any) => {
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
          event.preventDefault();
          event.stopPropagation();
        }
        if (form.checkValidity() === true){
            if(address && Object.keys(address).length>0){
                dispatch(userActions.createNewAddressAction(address)).then((response:any)=>{
                    if(response && !response.error){
                        navigate("/users/profile");   
                    }
                })
            }
        }
        setValidated(true); 
      };

    return (
        <>
            { loading && <SpinnerUI/>}
            <FinalNavbar/>
            <LayoutHeading heading={"Address"} color={'text-success'}/>
            <Container>
                <Row>
                    <Col xs={4}>
                        <Form noValidate validated={validated} onSubmit={handleSubmit}>
                            <Form.Group className='mb-2'>
                                <Form.Control                                      
                                    required
                                    value={address.mobile}
                                    onChange={e=>updateInput(e)}
                                    /* onChange={updateInput} */
                                    name='mobile'
                                    type={'text'} placeholder={'Mobile'}></Form.Control>
                            </Form.Group>
                            <Form.Group className='mb-2'>
                                <Form.Control                                      
                                    required
                                    value={address.flat}
                                    onChange={e=>updateInput(e)}
                                    /* onChange={updateInput} */
                                    name='flat'
                                    type={'text'} placeholder={'Flat'}></Form.Control>
                            </Form.Group>
                            <Form.Group className='mb-2'>
                                <Form.Control                                      
                                    required
                                    value={address.landmark}
                                    onChange={e=>updateInput(e)}
                                    /* onChange={updateInput} */
                                    name='landmark'
                                    type={'text'} placeholder={'Landmark'}></Form.Control>
                            </Form.Group>
                            <Form.Group className='mb-2'>
                                <Form.Control                                      
                                    required
                                    value={address.street}
                                    onChange={e=>updateInput(e)}
                                    /* onChange={updateInput} */
                                    name='street'
                                    type={'text'} placeholder={'Street'}></Form.Control>
                            </Form.Group>
                            <Form.Group className='mb-2'>
                                <Form.Control                                      
                                    required
                                    value={address.city}
                                    onChange={e=>updateInput(e)}
                                    /* onChange={updateInput} */
                                    name='city'
                                    type={'text'} placeholder={'City'}></Form.Control>
                            </Form.Group>
                            <Form.Group className='mb-2'>
                                <Form.Control                                      
                                    required
                                    value={address.state}
                                    onChange={e=>updateInput(e)}
                                    /* onChange={updateInput} */
                                    name='state'
                                    type={'text'} placeholder={'State'}></Form.Control>
                            </Form.Group>
                            <Form.Group className='mb-2'>
                                <Form.Control                                      
                                    required
                                    value={address.country}
                                    onChange={e=>updateInput(e)}
                                    /* onChange={updateInput} */
                                    name='country'
                                    type={'text'} placeholder={'Country'}></Form.Control>
                            </Form.Group>
                            <Form.Group className='mb-2'>
                                <Form.Control                                      
                                    required
                                    value={address.pinCode}
                                    onChange={e=>updateInput(e)}
                                    /* onChange={updateInput} */
                                    name='pinCode'
                                    type={'text'} placeholder={'PinCode'}></Form.Control>
                            </Form.Group>
                            <Form.Group className='mb-2'>
                                <Button type='submit' variant='success'>Add</Button>
                                <Link to={"/users/profile"} className=' btn btn-dark ms-2'>Cancel</Link>
                            </Form.Group>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </>
    )
}


export default AddShippingAddress;
