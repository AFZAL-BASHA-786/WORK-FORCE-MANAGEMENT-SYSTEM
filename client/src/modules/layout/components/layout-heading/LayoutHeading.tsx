import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { Container } from 'react-bootstrap';

interface IProps{
    heading: string,
    color: string,
    icon?: string
}

const LayoutHeading: React.FC<IProps> = ({heading,color,icon}) =>{
    return (
        <>
            <Container className='mt-3'>
                <Row>
                    <Col>
                        <p className={`h3 ${color}`}>
                            <i className={`bi ${icon}`}></i>{heading}</p>
                        <p >Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure id, labore voluptatum adipisci illum possimus rem? Excepturi culpa minima ab sit neque fuga libero? Beatae, alias provident ad necessitatibus delectus esse reprehenderit eos hic est. Totam in eius pariatur tempora.</p>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default LayoutHeading;