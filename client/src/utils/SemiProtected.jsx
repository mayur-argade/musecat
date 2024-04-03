import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Login from '../pages/User/Login/Login'
import { useEffect } from "react";
import { useSelector } from 'react-redux'


const SemiProtected = (props) => {
    const { Component } = props;
    const location = useLocation()

    sessionStorage.setItem('prevLocation', location.pathname);
    const navigate = useNavigate();

    const { user, isAuth } = useSelector((state) => state.auth);

    // useEffect(() => {
    //     function checkLogin() {
    //         if (isAuth == false || user == null || user.type != 'user') {
    //             navigate('/login')
    //         }
    //     }
    //     checkLogin();
    // }, [navigate]);

    return (
        <div>
            {
                isAuth == false || user == null || user.type != 'user'
                    ?
                    <Login />
                    :
                    <Component />
            }
        </div>
    );
};

export default SemiProtected;
