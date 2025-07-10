import React from 'react';
import { TokenUtil } from '../util/TokenUtil';
import * as userReducer from "../redux/users/user.reducer"
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { Col, Container, Row } from 'react-bootstrap';
import SpinnerUI from '../modules/ui/components/SpinnerUI';

function AdminRoute({children} : any){
    const userState:userReducer.InitialState = useSelector((state: RootState)=>{
        return state[userReducer.userFeatureKey]
    }) 
    let {user,loading} = userState;
    const auth = TokenUtil.isLoggedIn();
    return auth && user.isAdmin ? children : <>
        {loading && <SpinnerUI/>}
        <Container>
            <Row>
                <Col>
                    <p className="h3 text-danger">You are not authorized to access this</p>
                </Col>
            </Row>
        </Container>
        
    </>
}

export default AdminRoute; 