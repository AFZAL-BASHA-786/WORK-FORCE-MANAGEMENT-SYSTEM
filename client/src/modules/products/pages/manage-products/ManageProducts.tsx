import React, { useEffect } from 'react';
import FinalNavbar from '../../../layout/pages/navbar/FinalNavBar';
import LayoutHeading from '../../../layout/components/layout-heading/LayoutHeading';
import { Button, Col, Container, Row, Table } from 'react-bootstrap';
import { AppDispatch, RootState, useAppDispatch } from '../../../../redux/store';
import * as productActions from "../../../../redux/products/product.actions"
import * as productReducer from "../../../../redux/products/product.reducer"
import { useSelector } from 'react-redux';
import SpinnerUI from '../../../ui/components/SpinnerUI';
import { Link } from 'react-router-dom';

const ManageProducts: React.FC = () =>{

    const dispatch: AppDispatch = useAppDispatch();

    let productState:productReducer.InitialState = useSelector((state:RootState)=>{
        return state[productReducer.productFeatureKey];
    })

    const {loading,products} = productState;

    let clickDeleteProduct = (productId:string)=> {
        dispatch(productActions.deleteProductAction({productId:productId})).then((response:any)=>{
            if(!response.error){
                /* To See Updated Data again we have to get all products back */
                dispatch(productActions.getAllProductsAction());
            }
        });
    }

    useEffect(()=>{
        dispatch(productActions.getAllProductsAction())
    },[])

    return (
        <>
            {loading && <SpinnerUI/>}
            <FinalNavbar/>
            <LayoutHeading heading='Manage Workers' color='text-success'/>
            {
                products && products.length>0 &&
                <Container>
                    <Row>
                        <Col>
                            <Table striped hover className=' text-center shadow-lg'>
                                <thead className={' bg-success text-white'} id='thead' >
                                    <tr>
                                        <th>S.No</th>
                                        <th>Worker Id</th>
                                        <th>Image</th>
                                        <th>Name</th>
                                        <th>Gmail</th>
                                        <th>Mobile</th>
                                        <th>Pincode</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody className=' bg-success' >
                                    {
                                        products.map((product,index)=>{
                                            return (
                                                <tr key={product._id}>
                                                    <td>{index+1}</td>
                                                    <td>{product._id.substring(product._id.length -5 )}</td>
                                                    <td><img src={product.imageUrl} className=' img-fluid shadow-lg flex d-flex align-items-center justify-content-center'  height={1000} width={50} alt="" /></td>
                                                    <td>{product.employeename}</td>
                                                    <td>{product.email}</td>
                                                    <td>{product.mobile}</td>
                                                    <td>{product.pinCode}</td>
                                                    <td>
                                                        <Link to={`/products/edit/${product._id}`}>
                                                            <Button variant='primary'>
                                                                <i className="bi bi-pencil-square"></i>
                                                            </Button>
                                                        </Link>
                                                        <Button onClick={()=>clickDeleteProduct(product._id)} variant='danger m-2'>
                                                            <i className="bi bi-trash-fill"></i>
                                                        </Button>
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
            }
        </>
    )
}

export default ManageProducts;
