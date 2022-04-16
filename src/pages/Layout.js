import React from 'react';
import {Link, Outlet} from "react-router-dom"
import styled from "styled-components";
import {useSelector} from "react-redux";

const Header = styled.div`
  position: sticky;
  background: var(--primary);
  margin-bottom: 40px;
  padding: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  @media only screen and (min-width: 1280px) {
    padding: 15px;
    justify-content: center;
  }
  .auth-buttons {
    position: relative;
    left: 0;
    padding: 5px;
    display: flex;
    @media only screen and (min-width: 1280px) {
      position: absolute;
      padding: 10px;
    }
  }
  h1 {
    margin: 0;
    text-align: center;
    font-size: 16px;
    @media only screen and (min-width: 1280px) {
      font-size: 36px;
    }
  }
  a {
    text-decoration: none;
    color: #000;
  }
  .auth-link {
    display: block;
    text-decoration: none;
    color: #000;
    font-size: 16px;
    border-radius: 6px;
    border: 2px solid var(--secondary);
    padding: 10px;
    width: 80px;
    text-align: center;
  }
  .auth-link + .auth-link {
    margin-left: 15px;
  }
`

const Layout = props => {
    const isAuth = useSelector(({appState}) => appState.isAuth)
    return (
        <>
            <Header>
                <Link to={''} className={"logo"}><h1>Todo App</h1></Link>
                {
                    isAuth ? null :
                        <div className={'auth-buttons'}>
                            <Link to={"auth/register"} className={'auth-link'} >Sign Up</Link>
                            <Link to={"auth/login"} className={'auth-link'}>Sign In</Link>
                        </div>
                }
            </Header>
            <main>
                <Outlet/>
            </main>

        </>
    );
};

export default Layout;