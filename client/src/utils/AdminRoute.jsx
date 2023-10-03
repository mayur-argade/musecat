import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux'


const GuestRoute = (props) => {
    const { Component } = props;

    const navigate = useNavigate();

    const { user, isAuth } = useSelector((state) => state.auth);


    useEffect(() => {
        function specialTreatment() {
            if (isAuth === true && user.role == "admin") {
                navigate("/admin/home")
            }
            else {
                navigate("/login")
            }
        }

        specialTreatment();
    }, [navigate])


    return (
        <div>
            <Component />
        </div>
    )
}

export default GuestRoute