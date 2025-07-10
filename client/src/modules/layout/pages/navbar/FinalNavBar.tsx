import React from 'react';
import { Container, Nav, NavDropdown, Navbar } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import * as userReducer from "../../../../redux/users/user.reducer"
import { AppDispatch, RootState, useAppDispatch } from '../../../../redux/store';
import { useSelector } from 'react-redux';
import * as cartReducer from "../../../../redux/cart/cart.reducer";

const FinalNavbar: React.FC = () =>{

    const dispatch : AppDispatch = useAppDispatch();
    const navigate = useNavigate();

    const userState:userReducer.InitialState = useSelector((state: RootState)=>{
        return state[userReducer.userFeatureKey];
    }) 

    /* get cart count form redux */
    const cartState:cartReducer.InitialState = useSelector((state: RootState)=>{
        return state[cartReducer.cartFeatureKey];
    })
    
    let {products} = cartState;
    let {isAuthenticated,user} = userState;

    const clickLogOut = () => {
        navigate("/"); // it is used for drop down log out puprpose 
        dispatch(userReducer.userLogOutAction());
    }

    const navigateTo= (path : string)=>{
        navigate(path);
    }

    return (
        <>
            {/* remember first bg later expand */}
            <Navbar bg='success' expand="lg"  variant={'dark'} >
                <Container>
                    <Navbar.Brand >
                        <Link to={"/"} className=' text-white text-decoration-none'>Work Force</Link>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        {
                            isAuthenticated &&
                            <>
                                <Nav className="">
                                    <Link to={'/products/fashion'} className=' nav-link'>Skilled</Link>
                                </Nav>
                                <Nav className="">
                                    <Link to={'/products/electronics'} className=' nav-link'>Semi-Skilled</Link>
                                </Nav>
                                <Nav className="">
                                    <Link to={'/products/household'} className=' nav-link'>Unskilled</Link>
                                </Nav>
                                {
                                    user && user.isAdmin &&
                                    <Nav>
                                        <NavDropdown title={"Admin"} id="basic-nav-dropdown" className=' text-white'>
                                            {
                                                user && user.isSuperAdmin && 
                                                <NavDropdown.Item onClick={() => navigateTo("/categories/add")}>Add Categories</NavDropdown.Item>
                                            }
                                            {
                                                user && user.isAdmin &&
                                                <NavDropdown.Item onClick={() => navigateTo("/products/upload")}>Upload Workers</NavDropdown.Item>
                                            }
                                            {
                                                user && user.isAdmin && user.isSuperAdmin &&
                                                <>
                                                    <NavDropdown.Divider />
                                                    <NavDropdown.Item onClick={() => navigateTo("/products/manage")}>Manage Workers</NavDropdown.Item>
                                                    <NavDropdown.Item onClick={() => navigateTo("/orders/manage")}>Manage Appointments</NavDropdown.Item>
                                                </>
                                            }
                                        </NavDropdown>
                                    </Nav>  
                                }
                            </>
                        }
                        {
                            isAuthenticated ? 
                            <>
                                <div className=" d-flex ms-auto">
                                    <Nav className="">
                                        <Link to={'/cart/list'} className=' nav-link'>
                                            <div className="cart-wrapper">
                                                <i className="bi bi-cart-fill"></i>
                                                <span className='cart-count'>{products && products.length}</span> 
                                            </div>
                                        </Link>
                                    </Nav>
                                    <img src={user.imageUrl} height={25} width={25} className={" rounded-circle shadow-lg mt-2"} alt="" />
                                    <Nav >
                                        <NavDropdown title={user.username} id="basic-nav-dropdown" className=' text-white'>
                                            <NavDropdown.Item onClick={() => navigateTo("/users/profile")}>Profile</NavDropdown.Item>
                                            {/* <NavDropdown.Item onClick={() => navigateTo("/users/change-password")}>Change Password</NavDropdown.Item> */}
                                            <NavDropdown.Item onClick={() => navigateTo("/orders/me")}>My Appointments</NavDropdown.Item>
                                            <NavDropdown.Divider />
                                            <NavDropdown.Item onClick={clickLogOut}>
                                                <i className=" bi bi-power text-white"></i>Log Out
                                            </NavDropdown.Item>
                                        </NavDropdown>

                                        {/* <Link to={'/users/profile'} className=' nav-link'>
                                        <img src={user.imageUrl} height={25} width={25} className={" rounded-circle shadow-lg"} alt="" /> { user.username}
                                        </Link> */}
                                        {/* /* <img src={user.imageUrl} height={25} width={25} className={" rounded-circle shadow-lg"} alt="" />   */}
                                    </Nav>
                                    <Nav>
                                        <Link to={"/"} className=' nav-link' onClick={clickLogOut}>
                                            <i className=" bi bi-power text-white"></i>
                                        </Link>
                                    </Nav>
                                </div>
                            </>:
                            <Nav className=" d-flex ms-auto">
                                <Link to={'/users/login'} className=' nav-link'>Login</Link>
                            </Nav>
                        }
                    </Navbar.Collapse>
                </Container>
            </Navbar>            
        </>
    )
}

export default FinalNavbar;