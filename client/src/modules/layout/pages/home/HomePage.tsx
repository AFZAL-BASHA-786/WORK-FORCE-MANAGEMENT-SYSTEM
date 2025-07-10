import React from 'react';
import { Link } from 'react-router-dom';
import * as userReducer from "../../../../redux/users/user.reducer"
import { RootState } from '../../../../redux/store';
import { useSelector } from 'react-redux';


const HomePage: React.FC = () =>{

    const userState:userReducer.InitialState = useSelector((state : RootState)=>{
        return state[userReducer.userFeatureKey];
    })
    /* here we are not using user but mistakenly written. if i am deleting it right now
        it is showing runtime erros. so i am not deleting that user here in home page.
        we are not using user thats y it is showing HomePage in yellow color
    */
    let {isAuthenticated,user} = userState;
    let controlUserToOvercomeRuntimeError: any = true;
    return ( 
        <>
            <div className="landing-page">
                <div className="landing-wrapper">
                    <div className=' d-flex flex-column justify-content-center align-items-center text-center h-100'>
                        <p className=' display-1 text-success'>Work Force</p>
                        <div>
                            {
                                isAuthenticated ? 
                                <Link to={"/products/list"} className=' btn btn-success m-2 '>
                                <i className=" bi bi-person-circle"></i> Book Appointment </Link>
                                :
                                <Link to={"/users/login"} className=' btn btn-success m-2 '>
                                <i className="bi bi-lock"></i> Login</Link>
                            }
                            {
                                /* to overcome error i have written this */
                                controlUserToOvercomeRuntimeError ? <>
                                
                                </>: <>
                                    <p>{user.username}</p>
                                </>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default HomePage;