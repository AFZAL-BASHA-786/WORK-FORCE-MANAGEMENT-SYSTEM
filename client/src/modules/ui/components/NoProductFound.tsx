import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import NoProductImage from "../../../assets/img/noimg copy.png"
const NoProductFound = ()=>{
    return (
        <>
            <Container>
                <Row>
                    <Col>
                        <img src={NoProductImage} alt="" className=' m-auto d-block text-center' />                    
                    </Col>
                </Row>
            </Container>
        </>
    )
} 

export default NoProductFound;
