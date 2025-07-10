import React from 'react';
import { TokenUtil } from '../util/TokenUtil';
import { Navigate } from 'react-router-dom';
/* PrivateRoute is just o verify whether the person has token or not */
function PrivateRoute({children} : any){

    const auth = TokenUtil.isLoggedIn();
    return auth ? children : <>
        <Navigate to={"/users/login"}/>
    </>
}

export default PrivateRoute;