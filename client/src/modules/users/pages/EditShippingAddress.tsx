import React, { useEffect, useState } from 'react';
import FinalNavbar from '../../layout/pages/navbar/FinalNavBar';
import LayoutHeading from '../../layout/components/layout-heading/LayoutHeading';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { Link, useNavigate, useParams } from 'react-router-dom';
import * as userActions from "../../../redux/users/user.actions";
import { AppDispatch,RootState,useAppDispatch } from '../../../redux/store';
import * as userReducer from "../../../redux/users/user.reducer"
import { useSelector } from 'react-redux';
import SpinnerUI from '../../ui/components/SpinnerUI';
import { ToastUtil } from '../../../util/ToastUtil';
import { AddressView } from '../models/AddressView';
 

const EditShippingAddress : React.FC = () =>{ 
    const {addressId} = useParams(); 
    /*  In react UseParams()
        In Express request.params
    */

    const userState: userReducer.InitialState = useSelector((state:RootState)=>{
        return state[userReducer.userFeatureKey]
    })

    let {loading,address: reduxAddress} = userState;

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
    /* The plan is first bring the reduxAddress and allot that to setAddress.
     so now address contains all the details. so here there is no need for us to write
     all fileds once again just we can change the field which we want to vhange. and 
     rest of the fields are already filled. In this way it will reduxAddress create advantage 
     and saves the time of user. The fileds which we are going to change are taken care by
     updateInput function */
    useEffect(()=>{
        if(reduxAddress && Object.keys(reduxAddress).length>0){
            setAddress({
                mobile: reduxAddress.mobile ? reduxAddress.mobile :"",
                flat: reduxAddress.flat ? reduxAddress.flat :"",
                landmark: reduxAddress.landmark ? reduxAddress.landmark :"",
                street: reduxAddress.street ? reduxAddress.street :"",
                city: reduxAddress.city ? reduxAddress.city :"",
                state: reduxAddress.state ? reduxAddress.state :"",
                country: reduxAddress.country ? reduxAddress.country :"",
                pinCode: reduxAddress.pinCode ? reduxAddress.pinCode :""
            })
        }
    },[reduxAddress]);

    useEffect(()=>{
        if(addressId){
            dispatch(userActions.getAddressAction())
        }
    },[addressId])

    const handleSubmit = (event:React.FormEvent | any) => {
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
          event.preventDefault();
          event.stopPropagation();
        }
        if (form.checkValidity() === true){
            if(addressId && addressId.length>0 && address && Object.keys(address).length>0){
                dispatch(userActions.updateAddressAction({address:address,addressId:addressId})).then((response:any)=>{
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
            <LayoutHeading heading={" Address"} color={'text-primary'}/>
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
                                <Button type='submit' variant='primary'>Update</Button>
                                <Link to={"/users/profile"} className=' btn btn-dark ms-2'>Cancel</Link>
                            </Form.Group>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </>
    )
}


export default EditShippingAddress;
