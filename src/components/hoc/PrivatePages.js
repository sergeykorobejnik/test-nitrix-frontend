import React, {useEffect, useState} from 'react';
import {Navigate} from "react-router-dom"
import {useDispatch, useSelector} from "react-redux";
import {authCheck} from "../../redux/actions/actions";

const PrivatePages = ({children}) => {
    const dispatch = useDispatch()
    const isAuth = useSelector(({appState}) => appState.isAuth)
    useEffect(() => {
        dispatch(authCheck())
    }, [isAuth])


    if (!isAuth) return <Navigate to="/auth/login"/>
        else return children
};

export default PrivatePages;