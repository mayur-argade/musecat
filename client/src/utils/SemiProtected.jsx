import React from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useSelector } from 'react-redux'


const SemiProtected = (props) => {
    const { Component } = props;

    const navigate = useNavigate();

    const { user, isAuth } = useSelector((state) => state.auth);

    useEffect(() => {
        function checkLogin() {
            if (isAuth == false) {
                navigate('/login')
            } if (isAuth === true) {

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
