import React, { useState } from 'react';
import FinalNavbar from '../../layout/pages/navbar/FinalNavBar';
import LayoutHeading from '../../layout/components/layout-heading/LayoutHeading';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { UserView } from '../models/UserView';
import * as userActions from "../../../redux/users/user.actions";
import { AppDispatch,RootState,useAppDispatch } from '../../../redux/store';
import * as userReducer from "../../../redux/users/user.reducer"
import { useSelector } from 'react-redux';
import SpinnerUI from '../../ui/components/SpinnerUI';
 

const UserLogin: React.FC = () =>{ 
    // User state is retrieved loading 
    const userState: userReducer.InitialState = useSelector((state:RootState)=>{
        return state[userReducer.userFeatureKey]
    })

    let {loading} = userState;


    const [validated, setValidated] = useState<boolean>(false);
    const dispatch : AppDispatch = useAppDispatch();
    const navigate = useNavigate();

    // 1
    const [user,setUser] = useState<UserView>({
        email: '',
        password: ''
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
            dispatch(userActions.loginUserAction({user:user})).then((response:any)=>{
                if(response && !response.error){
                    navigate("/");
                }
            })
        }
        setValidated(true);
      };
       
    return (
        <>
            { loading && <SpinnerUI/>}
            <FinalNavbar/>
            <LayoutHeading heading={"Login Here"} color={'text-success'} icon={"bi-lock"} />
            <Container>
                <Row>
                    <Col xs={4}>
                        <Form noValidate validated={validated} onSubmit={handleSubmit}>
                            <Form.Group className='mb-2'>
                                <Form.Control  type='email' placeholder='Email'
                                    required
                                    value={user.email}
                                    onChange={e=>updateInput(e)}
                                    name='email'></Form.Control>
                                <Form.Control.Feedback>Looks good!</Form.Control.Feedback> 
                                <Form.Control.Feedback type='invalid'>
                                    Please choose a valid email</Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group className='mb-2'>
                                <Form.Control  type={'password'} placeholder='Password'                                    
                                    required
                                    pattern=    "^(?=[^a-z]*[a-z])(?=[^A-Z]*[A-Z])(?=\D*\d)(?=[^@]*@)[a-zA-Z\d@]+$"
                                    value={user.password}
                                    onChange={e=>updateInput(e)}
                                    name='password'></Form.Control>
                                <Form.Control.Feedback>Looks good!</Form.Control.Feedback> 
                                <Form.Control.Feedback type='invalid'>
                                    Please choose a valid Password</Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group className='mb-2'>
                                <Button type='submit' variant='success'>Login</Button>
                                <Link to={"/"} className=' btn btn-dark ms-2'>Cancel</Link>
                            </Form.Group>
                            <small>Already have an account ?
                                <Link to={'/users/register'} className=' text-decoration-none fw-bold text-success'>Register</Link>
                            </small>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default UserLogin;


