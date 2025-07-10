import React, { useEffect, useRef, useState } from 'react';
import FinalNavbar from '../../../layout/pages/navbar/FinalNavBar';
import LayoutHeading from '../../../layout/components/layout-heading/LayoutHeading';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { AppDispatch, RootState, useAppDispatch } from '../../../../redux/store';
import * as categoryReducer from "../../../../redux/categories/category.reducer";
import { CategoryView, SubCategoryView } from '../../../categories/models/CategoryView';
import * as categoryActions from "../../../../redux/categories/category.actions";
import { ProductRequestView } from '../../models/ProductRequestView';
import { UploadImageWidget } from '../../../../util/UploadImageWidget';
import * as productActions from "../../../../redux/products/product.actions"
import * as productReducer from "../../../../redux/products/product.reducer"
import SpinnerUI from '../../../ui/components/SpinnerUI';

const EditProduct: React.FC = () =>{

    const {productId} = useParams();
    const navigate = useNavigate();
    const categoryState : categoryReducer.InitialState = useSelector((state:RootState)=>{
        return state[categoryReducer.categoryFeatureKey];
    })
    
    let {categories} = categoryState;

    const productState: productReducer.InitialState = useSelector((state:RootState)=>{
        return state[productReducer.productFeatureKey]
    })
    /* here we already used product. if we again write product means it generates. so to overcome this
    problem give a name to product belongs to productSate as reduxProduct */
    const {loading,product: reduxProduct} = productState;

    let [subCategories,setSubCategories]= useState<SubCategoryView[]>([] as SubCategoryView[]);

    const [validated, setValidated] = useState<boolean>(false);
    const dispatch : AppDispatch = useAppDispatch();
    const [product,setProduct] = useState<ProductRequestView>({
        employeename: "",
        email: "",
        imageUrl: "",
        mobile: "",
        flat: "",
        price: "",
        street: "",
        city: "",
        state: "",
        country: "",
        pinCode: "",
        categoryId: "",
        subCategoryId: "",
    } as ProductRequestView)
    const selectCategory = (event:React.ChangeEvent<HTMLSelectElement>) =>{
        setProduct({...product,categoryId:event.target.value})
        if(categories.length>0){
            let category: CategoryView|undefined = categories.find(category => category._id?.toString() === event.target.value);
            if(category){
                setSubCategories(category.subCategories)
            }
            else{
                setSubCategories([] as SubCategoryView[])
            }
        }
    }

    const selectSubCategory = (event:React.ChangeEvent<HTMLSelectElement>) =>{
        setProduct({...product,subCategoryId:event.target.value})
    }

    const updateProductInput = (event: React.ChangeEvent<HTMLFormElement>|any)=>{
        setProduct({
            ...product,
            [event.target.name] : event.target.value
        })
    }

    
    /*//! -------------------------------- UPLOADING IMAGES START------------------------------ */
    const cloudinaryRef = useRef<any>(); // cloudinaryRef is for above cloudinary object
    const widgetRef = useRef<any>(); // widgetRef is for uploading widget
    // const [imageUrl,setImageUrl] = useState<string>("");

    // ! remember here in useEffect dependency array is removed in future it may show error
    useEffect(()=>{
        dispatch(categoryActions.getAllCategoriesAction());
        UploadImageWidget.upload(cloudinaryRef,widgetRef).then((imageUrl)=>{
            if(imageUrl){
                setProduct({...product,imageUrl:imageUrl.toString()})
            }
        }).catch((errorMessage)=>{
            console.log(errorMessage);
            
        });
    },[]) 

    useEffect(()=>{
        if(productId){
            dispatch(productActions.getProductAction({productId : productId}))
        }
    },[productId]) 

    
    useEffect(()=>{
        setProduct({
            ...product,
            employeename: reduxProduct.employeename ? reduxProduct.employeename : "", 
            email: reduxProduct.email ? reduxProduct.email : "",
            imageUrl: reduxProduct.imageUrl ? reduxProduct.imageUrl : "",
            mobile: reduxProduct.mobile ? reduxProduct.mobile : "",
            price: reduxProduct.price ? reduxProduct.price : "",
            flat: reduxProduct.flat ? reduxProduct.flat : "",
            street: reduxProduct.street ? reduxProduct.street : "",
            city: reduxProduct.city ? reduxProduct.city : "",
            state: reduxProduct.state ? reduxProduct.state: "",
            country: reduxProduct.country ? reduxProduct.country : "",
            pinCode: reduxProduct.pinCode ? reduxProduct.pinCode : "",
            categoryId: reduxProduct.categoryObj?._id ? reduxProduct.categoryObj?._id : "",
            subCategoryId: reduxProduct.subCategoryObj?._id ? reduxProduct.subCategoryObj?._id : "",
        })
    },[reduxProduct]) 

    /*//! -------------------------------- UPLOADING IMAGES END------------------------------ */

    const handleSubmit = (event:React.FormEvent| any) => {
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === true && productId!=="") { 
          dispatch(productActions.updateProductAction({
            product: product,
            productId: productId
          })).then((response:any)=>{
            if(!response.error){
                navigate("/products/manage")
            }
          })
        }
        if (form.checkValidity() === false){
            event.preventDefault();
            event.stopPropagation();
        }
        setValidated(true);
      };

    return (
        <>
            {loading && <SpinnerUI/>}
            <FinalNavbar/>
            <LayoutHeading heading='Edit Worker' color='text-primary'/>
            <Container>
                <Row>
                    <Col xs={4}>
                        <Form noValidate validated={validated} onSubmit={handleSubmit}>
                            <Form.Group>
                                {/* //! To Upload any image first we have to save that image in our computer/hard disk and then upload.
                                simply uploading my resume which is stored in my harddisk */}
                                <Button type='button' variant={'warning'} className=' m-1'
                                    onClick={()=>widgetRef.current.open()}><i className='bi bi-pencil-square'></i> Select Image</Button>
                            </Form.Group>
                            <Form.Group className='mb-2'>
                                {
                                    categories && categories.length>0 &&
                                    <Form.Select disabled onChange={e => selectCategory(e)} required>
                                        <option value={""}>Select a Category</option>
                                        {
                                            categories.map(category => {
                                                return (
                                                    <option key={category._id} value={category._id}>{category.name}</option>
                                                )
                                            })
                                        }
                                    </Form.Select>
                                }
                            </Form.Group> 
                            {
                                subCategories && subCategories.length> 0 && 
                                <Form.Group className='mb-2'>
                                    <Form.Select disabled onChange={e => selectSubCategory(e)} required>
                                        <option value={""}>Select a Category</option>
                                        {
                                            subCategories.map(subCategory => {
                                                return (
                                                    <option key={subCategory._id} value={subCategory._id}>{subCategory.name}</option>
                                                )
                                            })
                                        }
                                    </Form.Select>
                                </Form.Group>
                            }
                            {
                                /* 
                                employeename: "",
                                email: "",
                                imageUrl?: "",
                                mobile: "",
                                flat: "",
                                street: "",
                                city: "",
                                state: "",
                                country: "",
                                pinCode: "",
                                categoryId: "",
                                subCategoryId: "",
                                */
                            }
                            <Form.Group className='mb-2'>
                                <Form.Control
                                    required
                                    name='employeename' 
                                    value={product.employeename}
                                    onChange={e=>updateProductInput(e)}
                                    type='text' placeholder='Employee Name'></Form.Control>
                            </Form.Group>
                            <Form.Group className='mb-2'>
                                <Form.Control
                                    required
                                    name='email' 
                                    value={product.email}
                                    onChange={e=>updateProductInput(e)}
                                    type='text' placeholder='Email'></Form.Control>
                            </Form.Group>
                            <Form.Group className='mb-2'>
                                <Form.Control
                                    required
                                    name='mobile' 
                                    value={product.mobile}
                                    onChange={e=>updateProductInput(e)}
                                    type='text' placeholder='Mobile'></Form.Control>
                            </Form.Group><Form.Group className='mb-2'>
                                <Form.Control
                                    required
                                    name='flat' 
                                    value={product.flat}
                                    onChange={e=>updateProductInput(e)}
                                    type='text' placeholder='Flat'></Form.Control>
                            </Form.Group><Form.Group className='mb-2'>
                                <Form.Control
                                    required
                                    name='street' 
                                    value={product.street}
                                    onChange={e=>updateProductInput(e)}
                                    type='text' placeholder='Street'></Form.Control>
                            </Form.Group><Form.Group className='mb-2'>
                                <Form.Control
                                    required
                                    name='city' 
                                    value={product.city}
                                    onChange={e=>updateProductInput(e)}
                                    type='text' placeholder='City'></Form.Control>
                            </Form.Group><Form.Group className='mb-2'>
                                <Form.Control
                                    required
                                    name='state' 
                                    value={product.state}
                                    onChange={e=>updateProductInput(e)}
                                    type='text' placeholder='State'></Form.Control>
                            </Form.Group><Form.Group className='mb-2'>
                                <Form.Control
                                    required
                                    name='country' 
                                    value={product.country}
                                    onChange={e=>updateProductInput(e)}
                                    type='text' placeholder='Country'></Form.Control>
                            </Form.Group><Form.Group className='mb-2'>
                                <Form.Control
                                    required
                                    name='pinCode' 
                                    value={product.pinCode}
                                    onChange={e=>updateProductInput(e)}
                                    type='text' placeholder='PinCode'></Form.Control>
                            </Form.Group><Form.Group className='mb-2'>
                                <Form.Control
                                    required
                                    name='price' 
                                    value={product.price}
                                    onChange={e=>updateProductInput(e)}
                                    type='text' placeholder='Price'></Form.Control>
                            </Form.Group>
                            <Form.Group className='mb-2'>
                                <Button type='submit' variant='success'> Update Product </Button>
                                <Link to={"/products/manage"} className=' btn btn-dark ms-2'>Cancel</Link>
                            </Form.Group>
                        </Form>
                    </Col>
                    <Col xs={3}>
                        {
                            product && product.imageUrl.length>0 && 
                            <img src={product.imageUrl} alt="" className=' img-fluid shadow-lg rounded-3'/>
                        }
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default EditProduct;