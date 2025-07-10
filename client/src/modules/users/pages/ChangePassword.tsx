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
 
interface Password{
    password: string,
    confirmPassword: string
}

const ChangePassword: React.FC = () =>{ 

    const userState: userReducer.InitialState = useSelector((state:RootState)=>{
        return state[userReducer.userFeatureKey]
    })

    let {loading} = userState;

    const [validated, setValidated] = useState<boolean>(false);
    const dispatch : AppDispatch = useAppDispatch();
    const navigate = useNavigate();

    
    const [user,setUser] = useState<Password>({
        password: '',
        confirmPassword: ''
    })

    const updateInput = (event: React.ChangeEvent<HTMLInputElement> | any) => {
        setUser({
            ...user,
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
            if(user.password === user.confirmPassword){
                dispatch(userActions.changePasswordAction(user.password)).then((response:any)=>{
                    if(response && !response.error){
                        /* auto logg off by using local reducer not extra reducer once the
                        password is changed */
                        navigate("/");
                        dispatch(userReducer.logOffAction())   
                    }
                })
                // console.log(user.password, "sending to server")
            }else{
                ToastUtil.displayErrorToast("Both the passwords are not matched")
            }
        }
        setValidated(true);
      };
       
    return (
        <>
            { loading && <SpinnerUI/>}
            <FinalNavbar/>
            <LayoutHeading heading={"Change Password"} color={'text-success'} icon={"bi-eye-slash-fill"} />
            <Container>
                <Row>
                    <Col xs={4}>
                        <Form noValidate validated={validated} onSubmit={handleSubmit}>
                            <Form.Group className='mb-2'>
                                <Form.Control  type={'password'} placeholder={'New Password'}                                    
                                    required
                                    pattern="^(?=[^a-z]*[a-z])(?=[^A-Z]*[A-Z])(?=\D*\d)(?=[^@]*@)[a-zA-Z\d@]+$"
                                    value={user.password}
                                    onChange={e=>updateInput(e)}
                                    name='password'></Form.Control>
                                <Form.Control.Feedback>Looks good!</Form.Control.Feedback> 
                                <Form.Control.Feedback type='invalid'>
                                    Please choose a valid Password</Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group className='mb-2'>
                                <Form.Control  type={'password'} placeholder={'Confirm Password'}                                    
                                    required
                                    pattern="^(?=[^a-z]*[a-z])(?=[^A-Z]*[A-Z])(?=\D*\d)(?=[^@]*@)[a-zA-Z\d@]+$"
                                    value={user.confirmPassword}
                                    onChange={e=>updateInput(e)}
                                    name='confirmPassword'></Form.Control>
                                <Form.Control.Feedback>Looks good!</Form.Control.Feedback> 
                                <Form.Control.Feedback type='invalid'>
                                    Please choose a valid Password</Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group className='mb-2'>
                                <Button type='submit' variant='success'>Update</Button>
                                <Link to={"/"} className=' btn btn-dark ms-2'>Cancel</Link>
                            </Form.Group>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default ChangePassword;


