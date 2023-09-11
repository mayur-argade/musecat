import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux'


const Protected = (props) => {
    const { Component } = props;

    const navigate = useNavigate();

    const { user, isAuth } = useSelector((state) => state.auth);
    const { event } = useSelector((state) => state.event)

    useEffect(() => {
        function protectedRoute() {
            if (isAuth === false || user == null || event == null) {
                navigate(-1);
            } 
        }

        protectedRoute();
    }, [navigate]);

    return <div>
        <Component />
    </div>;
};

export default Protected;
