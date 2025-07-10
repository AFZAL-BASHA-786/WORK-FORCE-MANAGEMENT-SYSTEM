import React, { useEffect, useState } from 'react';
import FinalNavbar from '../../../../layout/pages/navbar/FinalNavBar';
import LayoutHeading from '../../../../layout/components/layout-heading/LayoutHeading';
import ProductSideBar from '../../../component/ProductSideBar';
import { Button, Card, Col, Container, Row } from 'react-bootstrap';
import { AppDispatch, RootState, useAppDispatch } from '../../../../../redux/store';
import * as categoryActions from "../../../../../redux/categories/category.actions";
import * as categoryReducer from "../../../../../redux/categories/category.reducer";
import * as productActions from "../../../../../redux/products/product.actions";
import * as productReducer from "../../../../../redux/products/product.reducer"
import { useSelector } from 'react-redux';
import { CategoryView, SubCategoryView } from '../../../../categories/models/CategoryView';
import SpinnerUI from '../../../../ui/components/SpinnerUI';
import { Link } from 'react-router-dom';
import { ProductResponseView } from '../../../models/ProductResponseView';
import NoProductFound from '../../../../ui/components/NoProductFound';
import * as cartReducer from "../../../../../redux/cart/cart.reducer"

const HouseholdCatalogue: React.FC = () =>{
    const dispatch : AppDispatch = useAppDispatch();
    const [subCategories,setSubCategories]=useState<SubCategoryView[]>([] as SubCategoryView[]);
    const [category,setCategory] = useState<CategoryView>({} as CategoryView);
    const[filteredTheProducts,setFilteredTheProducts] = useState<ProductResponseView[]>([] as ProductResponseView[]);
    
    /* get all categories from redux */
    const categoryState:categoryReducer.InitialState = useSelector((state: RootState)=>{
        return state[categoryReducer.categoryFeatureKey]
    })

    /* get all fashion products from redux */
    const productState: productReducer.InitialState = useSelector((state: RootState)=>{
        return state[productReducer.productFeatureKey]
    })

    const {loading, products} = productState;   
    const {categories} = categoryState;

    useEffect(()=>{
        dispatch(categoryActions.getAllCategoriesAction());
    },[dispatch]) /* applying dispatch and testing */

    useEffect(()=>{
        if(categories.length>0){
            const categoryObj: CategoryView | undefined = categories.find(cateObj => cateObj.name === "Household");
            if(categoryObj){
                setCategory(categoryObj)
                setSubCategories(categoryObj.subCategories?.map(item=>{
                    return {
                        ...item,
                        isChecked : true
                    }
                }))
            }
        }
    },[categories])

    useEffect(()=>{
        if(Object.keys(category).length>0){
            dispatch(productActions.getAllProductsWithCategoryIdAction({categoryId: category._id}));
        }
    },[category])

    useEffect(()=>{
        if(products){
            setFilteredTheProducts(products);
        }
    },[products])

    const filteredTheProductsfunction = (subsList : SubCategoryView[])=>{
        let subs = subsList.map(item=>{
            if(item.isChecked){
                return item._id;
            }
        }).filter(item => item !== undefined);
        /* Checking whether subCategory Id of products present in the subs/not */
        // setFilteredTheProducts(products.filter(item => subs.includes(item?.subCategoryObj?._id)));
        if (Array.isArray(products) && Array.isArray(subs)) {
            setFilteredTheProducts(products.filter(item => subs.includes(item?.subCategoryObj?._id || '')));
        }
        
    };

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
            <Container fluid>
                <Row>
                    <Col xs={1}>
                    <ProductSideBar subCategories={subCategories}
                            setSubCategories={setSubCategories}
                            filteredTheProductsfunction={filteredTheProductsfunction}/>
                    </Col>
                    <Col>
                        <LayoutHeading heading='Household Catalogue' color='text-success'/>    
                    </Col>
                </Row>
            </Container> 
            {
                filteredTheProducts && filteredTheProducts.length > 0 && 
                <Container>
                    <Row>
                        {
                            filteredTheProducts.map((product) => {
                                return (
                                    <Col xs={3} key={product._id} className='mb-3 text-center '  >
                                        <Card >
                                            <Card.Header className='household-products'>
                                                <Link to={`/products/view/${category.name}/${product._id}`}>
                                                    <img src={product.imageUrl} alt="" width={180} height={140} className=' text-center m-auto d-block'/>
                                                </Link>
                                            </Card.Header>
                                            <Card.Body>
                                                <small className=" fw-bold text-success"></small><br/>
                                                <small className=" fw-bold text-danger">&#8377;{Number(product.price).toFixed(2)}</small><br/>
                                                <Button variant={"warning"} size={'sm'} onClick={()=>clickAddToCart(product)}> Add To Cart </Button>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                )
                            })
                        }
                    </Row>
                </Container>
            } 
            {
                filteredTheProducts.length === 0 && 
                <NoProductFound/>
            }     
        </>
    )
}

export default HouseholdCatalogue;
