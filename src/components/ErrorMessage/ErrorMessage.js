import React, {useEffect} from 'react';
import styled from "styled-components";
import {useDispatch, useSelector} from "react-redux";
import {clearError} from "../../redux/actions/actions";

const ErrorContainer = styled.div` 
  position: fixed;
  top: ${({isActive}) => isActive ? "15px" : "-300px"};
  padding: 10px 30px;
  background: RGBA(255,102,102,1);
  z-index: 999;
  left: 50%;
  transform: translateX(-50%);
  border-radius: 6px;
  transition: top .5s ease-in-out;
  .error-message {
    color: white;
    font-size: 16px;
    text-align: center;
    text-transform: uppercase;
    font-weight: 700;
  }
`

const ErrorMessage = props => {
    const error = useSelector(({appState}) => appState.error)
    const dispatch = useDispatch()
    useEffect(() => {
        setTimeout(() => {
            dispatch(clearError())
        }, 3e3)
    }, [error])
    return (
        <ErrorContainer
            isActive={
            error.length > 0 && true
            }>
            <span className="error-message">{error}</span>
        </ErrorContainer>
    );

};

export default ErrorMessage;