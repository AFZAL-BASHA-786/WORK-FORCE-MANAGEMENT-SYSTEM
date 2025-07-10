import React, { useEffect } from 'react';
import FinalNavbar from '../../../layout/pages/navbar/FinalNavBar';
import LayoutHeading from '../../../layout/components/layout-heading/LayoutHeading';
import { useParams } from 'react-router-dom';
import * as productActions from "../../../../redux/products/product.actions";
import * as productReducer from "../../../../redux/products/product.reducer"
import { AppDispatch, RootState, useAppDispatch } from '../../../../redux/store';
import { useSelector } from 'react-redux';
import SpinnerUI from '../../../ui/components/SpinnerUI';
import { Button, Card, Col, Container, ListGroupItem, Row } from 'react-bootstrap';
import { ListGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import * as cartReducer from "../../../../redux/cart/cart.reducer"
import { ProductResponseView } from '../../models/ProductResponseView';

const ViewProduct: React.FC = () =>{

    const {categoryName,productId} = useParams();
    const dispatch : AppDispatch = useAppDispatch();

    const productState : productReducer.InitialState = useSelector((state:RootState)=>{
        return state[productReducer.productFeatureKey]
    })

    const {loading,product} = productState;
    
    useEffect(()=>{
        if(productId){
            dispatch(productActions.getProductAction({productId : productId }))
        }
    },[])

    const clickAddToCart = (product: ProductResponseView)=>{
        dispatch({
            type: `${cartReducer.addToCart}`,
            payload: {product: {...product,count:1}}
            /* product: {...product,count:1} is similar to below explaination. 
            if state.products = [product1, product2, product3] 
                then if we want to add product4
                state.products = [product1, product2, product3, product4]
                                        or
                state.products = [...state.products,product];
                where ...state.products brings previous three products
            */
        })
    }

    return (
        <>
            {loading && <SpinnerUI/>}
            <FinalNavbar/>
            {
                product && Object.keys(product).length> 0 &&
                <>
                    <LayoutHeading heading={product.employeename} color={' text-success'} />
                    <Container>
                        <Row>
                            <Col xs={3} className=''>
                                <Card>
                                    <Card.Header>
                                    <img src={product.imageUrl} alt="" width={180} height={280} className=' text-center m-auto d-block'/>
                                    </Card.Header>
                                </Card>
                            </Col>
                            <Col xs={8}>
                                <ListGroup>
                                    <ListGroupItem>Email: 
                                        <span className=' fw-bold'> {product.email}</span></ListGroupItem>
                                    <ListGroupItem>Employee Name: 
                                        <span className=' fw-bold'> {product.employeename}</span></ListGroupItem>
                                    <ListGroupItem>City: 
                                        <span className=' fw-bold'> {product.city}</span></ListGroupItem>
                                    <ListGroupItem>State: 
                                        <span className=' fw-bold'> {product.state}</span></ListGroupItem>    
                                    <ListGroupItem>Category: 
                                        <span className=' fw-bold'> {product.categoryObj?.name}</span></ListGroupItem>
                                    <ListGroupItem>Profession: 
                                        <span className=' fw-bold'> {product.subCategoryObj?.name}</span></ListGroupItem>
                                    <ListGroupItem>Pincode : 
                                        <span className=' fw-bold'> {product.pinCode}</span></ListGroupItem>
                                </ListGroup>
                                <Button variant={"warning"} size={'sm'} onClick={()=>clickAddToCart(product)} className='mt-2'> Add To Cart </Button>
                            </Col>
                        </Row>
                        <Row className=' mt-3'>
                            <Col xs={2}>
                                <Link to={`/products/${categoryName?.toLowerCase()}`}>
                                    <Button variant='success'>
                                        <i className=" bi bi-arrow-left-circle-fill"> Back</i>
                                    </Button>
                                </Link>
                            </Col>
                        </Row>
                    </Container>
                </>
            }
        </>
    )
}

export default ViewProduct;