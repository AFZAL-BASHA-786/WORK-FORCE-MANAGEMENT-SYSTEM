import React, { useEffect, useState } from 'react';
import FinalNavbar from '../../../layout/pages/navbar/FinalNavBar';
import LayoutHeading from '../../../layout/components/layout-heading/LayoutHeading';
import { Button, Col, Container, Form, ListGroup, ListGroupItem, Row } from 'react-bootstrap';
import { AppDispatch,RootState,useAppDispatch } from '../../../../redux/store';
import SpinnerUI from '../../../ui/components/SpinnerUI';
import * as categoryActions from "../../../../redux/categories/category.actions";
import * as categoryReducer from "../../../../redux/categories/category.reducer";
import { useSelector } from 'react-redux';
import { CategoryView, SubCategoryView } from '../../models/CategoryView';
 

const AddCategory: React.FC = () =>{ 

    const categoryState : categoryReducer.InitialState = useSelector((state:RootState)=>{
        return state[categoryReducer.categoryFeatureKey];
    })

    let {loading,categories} = categoryState;

    let [subCategories,setSubCategories]= useState<SubCategoryView[]>([] as SubCategoryView[]);

    const [validated, setValidated] = useState<boolean>(false);
    const dispatch : AppDispatch = useAppDispatch();
    const [categoryId,setCategoryId] = useState<string>("");
    const [subCategory,setSubCategory] = useState<SubCategoryView>({
        name: "",
        description: ""
    });

    // ! remember here in useEffect dependency array is removed in future it may show error
    useEffect(()=>{
        dispatch(categoryActions.getAllCategoriesAction());
    },[dispatch]) /* applying dispatch and testing */

    const selectCategory = (event:React.ChangeEvent<HTMLSelectElement>) =>{
        setCategoryId(event.target.value);
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

    const handleSubmit = (event:React.FormEvent | any) => {
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
          event.preventDefault();
          event.stopPropagation();
        }
        if (form.checkValidity() === true){
            dispatch(categoryActions.craeteSubCategoryAction({
                sub: subCategory,
                categoryId : categoryId 
            })).then((response:any)=>{
                if(response && !response.error){
                    dispatch(categoryActions.getAllCategoriesAction())
                    setCategoryId("")
                    setSubCategory({
                        name: "",
                        description: ""
                    })
                }
              })
        }
        setValidated(true);
      };
       
    return (
        <>
            { loading && <SpinnerUI/>}
            <FinalNavbar/>
            <LayoutHeading heading={"Add Sub Category"} color={'text-success'} icon={"bi-diagram-2"} />
            <Container>
                <Row>
                    <Col xs={4}>
                        <Form noValidate validated={validated} onSubmit={handleSubmit}>
                            <Form.Group className='mb-2'>
                                {
                                    categories && categories.length>0 &&
                                    <Form.Select onChange={e => selectCategory(e)} required>
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
                            <Form.Group className='mb-2'>
                                <Form.Control  type={'text'} 
                                    name='name' value={subCategory.name}
                                    onChange={e => setSubCategory({...subCategory,name : e.target.value})}
                                    placeholder='Sub Category' required></Form.Control>
                            </Form.Group>
                            <Form.Group className='mb-2'>
                                <Form.Control as="textarea" 
                                    name='description' value={subCategory.description}
                                    onChange={e => setSubCategory({...subCategory,description : e.target.value})}
                                    rows={3} placeholder='Description' required />
                            </Form.Group>
                            <Form.Group className='mb-2'>
                                <Button type='submit' variant='success'>Create</Button>
                            </Form.Group>
                        </Form>
                    </Col>
                    <Col xs={4}>
                        <p className=" fw-bold">Available Sub Categories</p> 
                        <ListGroup>
                            {
                                subCategories && subCategories.length>0 && subCategories.map(sub => {
                                    return (
                                        <ListGroupItem key={sub._id}>{sub.name}</ListGroupItem>
                                    )
                                })
                            }
                        </ListGroup>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default AddCategory;


