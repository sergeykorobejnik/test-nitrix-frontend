import React, {useEffect, useState} from 'react';
import {Navigate, useLocation, useNavigate} from "react-router-dom"
import {useDispatch, useSelector} from "react-redux";
import {authCheck} from "../../redux/actions/actions";

const PrivatePages = ({children}) => {
    const dispatch = useDispatch()
    const location = useLocation()
    const isAuth = useSelector(({appState}) => appState.isAuth)
    useEffect(() => {
        dispatch(authCheck())
    }, [isAuth])


    if (!isAuth) return <Navigate from={location.pathname} to="/test-nitrix-frontend/auth/login"/>
        else return children
};

export default PrivatePages;