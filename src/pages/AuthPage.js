import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import {useNavigate, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {userLogin, userRegister} from "../redux/actions/actions";



const Container = styled.form`
    margin: 0 auto;
    max-width: 480px;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    background: #fff;
    font-weight: 700;
    padding: 15px;
    font-size: 16px;
    border-radius: 6px;
    h2 {
      text-align: center;
    }
    input {
      border: 1px solid #ccc;
      padding: 15px;
      color: var(--secondary);
      border-radius: 6px;
      margin-bottom: 10px;
    }
    label {
      margin-bottom: 10px;
      margin-left: 5px;
      font-size: 16px;
    }
    button {
      padding: 15px;
      font-size: 16px;
      font-weight: 700;
      background: var(--primary);
      border: 2px solid var(--secondary);
      border-radius: 6px;
      cursor: pointer;
    }
`

const AuthPage = props => {
    const {type} = useParams()
    const isAuth = useSelector(({appState}) => appState.isAuth)
    const dispatch = useDispatch()
    const navigate = useNavigate()



    const [state, setState] = useState({
        email: 'ksn.u@yandex.ua',
        password: '123'
    })

    useEffect(() => {
        if(isAuth) navigate('/tasks', {replacer: true})
    }, [isAuth])

    const handleChanges = (key, event) => {

        const draft = state
        const {value} = event.target

        draft[key] = value

        setState(draft)
    }

    return (
        <Container>
            <h2>
                {type === "register" ? "Sign Up" : "Sign in"}
            </h2>
            <label htmlFor="">Email</label>
            <input type="email" onChange={handleChanges.bind(null, "email")} id="email"/>
            <label htmlFor="">Password</label>
            <input type="password" onChange={handleChanges.bind(null, "password")} id="password"/>
            <button type={"button"}
                    onClick={() => {
                        if (type === 'login') return dispatch(userLogin(state))
                        if (type === 'register') return dispatch(userRegister(state))
                    }}
            >Submit</button>
        </Container>
    );
};

export default AuthPage;