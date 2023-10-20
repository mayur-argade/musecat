import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useSelector } from 'react-redux'


const SemiProtected = (props) => {
    const { Component } = props;
    const location = useLocation()

    sessionStorage.setItem('prevLocation', location.pathname);
    const navigate = useNavigate();

    const { user, isAuth } = useSelector((state) => state.auth);

    useEffect(() => {
        function checkLogin() {
            if (isAuth == false) {
                navigate('/login')
            }
        }
        checkLogin();
    }, [navigate]);

    return (
        <div>
            <Component />
        </div>
    );
};

export default SemiProtected;
