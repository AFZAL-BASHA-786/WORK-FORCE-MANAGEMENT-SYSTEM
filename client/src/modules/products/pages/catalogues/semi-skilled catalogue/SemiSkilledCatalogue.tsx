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
import * as cityReducer from "../../../../../redux/cities/city.reducer"
import { useSelector } from 'react-redux';
import { CategoryView, SubCategoryView } from '../../../../categories/models/CategoryView';
import SpinnerUI from '../../../../ui/components/SpinnerUI';
import { Link, useNavigate } from 'react-router-dom';
import { ProductResponseView } from '../../../models/ProductResponseView';
import NoProductFound from '../../../../ui/components/NoProductFound';
import * as cartReducer from  "../../../../../redux/cart/cart.reducer"

const SemiSkilledCatalogue: React.FC = () =>{
    const dispatch : AppDispatch = useAppDispatch();
    const [subCategories,setSubCategories]=useState<SubCategoryView[]>([] as SubCategoryView[]);
    const [category,setCategory] = useState<CategoryView>({} as CategoryView);
    const[filteredTheProducts,setFilteredTheProducts] = useState<ProductResponseView[]>([] as ProductResponseView[]);
    const[filteredTheProductsDup,setFilteredTheProductsDup] = useState<ProductResponseView[]>([] as ProductResponseView[]);
    const navigate = useNavigate();
    
    /* get all categories from redux */
    const categoryState:categoryReducer.InitialState = useSelector((state: RootState)=>{
        return state[categoryReducer.categoryFeatureKey]
    })

    const cityState:cityReducer.CityState = useSelector((state: RootState)=>{
        return state[cityReducer.cityFeatureKey]
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
            const categoryObj: CategoryView | undefined = categories.find(cateObj => cateObj.name === "Semi-Skilled");
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

    // useEffect(()=>{
    //     if(products){
    //         setFilteredTheProducts(products);
    //         setFilteredTheProductsDup(products);
    //     }
    // },[products])

    useEffect(() => {
        if (products && cityState.selectedCity) {
            // Filter products based on the selected city
            const filteredProducts = products.filter(product => product.city === cityState.selectedCity);
            setFilteredTheProducts(filteredProducts);
            setFilteredTheProductsDup(filteredProducts);
        }
    }, [products, cityState.selectedCity]);

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


    let [searchKey,setSearchKey] = useState<string>("");


    const filteredContactsSearch = (event:React.ChangeEvent<HTMLInputElement>) => {
        setSearchKey(event.target.value)
        setFilteredTheProducts(
            filteredTheProducts.filter(product => product.subCategoryObj?.name.toUpperCase().trim().startsWith(event.target.value.toUpperCase().trim()))
        );
    }

    const changePlace = ()=>{
        navigate("/products/list");
    };

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
                        <LayoutHeading heading='Semi-Skilled Catalogue' color='text-success'/>    
                    </Col>
                </Row>
            </Container> 
             
            <div className=" container my-3" >
                <div className="row">
                    <div className="col-sm-6">
                        <form action="">
                            <div className="row">
                                <div className="col">
                                    <input type="text"
                                        value={searchKey} onChange={e => filteredContactsSearch(e)}
                                        className='form-control' placeholder='Search Product' />
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className="col-sm-6 ">
                        <Button variant={"success"} size={'lg'} onClick={changePlace} > Select Place </Button>
                    </div>
                </div>
            </div>
            {
                filteredTheProducts && filteredTheProducts.length > 0 && 
                <Container>
                    <Row>
                        {
                            filteredTheProducts.map((product) => {
                                return (
                                    <Col xs={3} key={product._id} className='mb-3 text-center '  >
                                        <Card >
                                            <Card.Header className='Skilled-products'>
                                                <Link to={`/products/view/${category.name}/${product._id}`}>
                                                <img src={product.imageUrl} alt="" width={180} height={180} className=' text-center m-auto d-block'/>
                                                </Link>
                                            </Card.Header>
                                            <Card.Body>
                                                <small className=" fw-bold text-success">{product.subCategoryObj?.name}</small><br/>
                                                <small className=" fw-bold text-success">{product.employeename}</small><br/>
                                                <small className=" fw-bold text-danger">&#8377;{Number(product.price).toFixed(2)}</small><br/>
                                                <Button variant={"warning"} size={'sm'} onClick={()=>clickAddToCart(product)} > Book </Button>
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

export default SemiSkilledCatalogue;