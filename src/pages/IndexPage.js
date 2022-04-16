import React from 'react';
import styled from "styled-components";
import {Link} from "react-router-dom";

const Container = styled.div` 
    background: var(--primary);
    max-width: 320px;   
    margin: 0 auto;
    border-radius: 6px;
    padding: 15px;
    text-align: center;
    @media only screen and (min-width: 1280px) {
      max-width: 480px;
    }
    h1 {
      font-size: 36px;
    }
    p {
      font-size: 24px;
    }
    a {
      text-decoration: none;
      font-size: 24px;
      font-weight: 700;
      color: #000;
      border: 2px solid #000;
      border-radius: 6px;
      padding: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 15px;
    }
`

const IndexPage = props => {
    return (
        <Container>
            <h1>Get started</h1>
            <p>This small application was developed as a test case for Nitrix.</p>
            <Link to="auth/register">Go to auth page</Link>
            <Link to="tasks">Go to app</Link>
        </Container>
    );
};

export default IndexPage;