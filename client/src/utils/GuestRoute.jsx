import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux'


const GuestRoute = (props) => {
    const { Component } = props;

    const navigate = useNavigate();

    const { user, isAuth } = useSelector((state) => state.auth);


    useEffect(() => {
        function specialTreatment() {
            if (isAuth === true && user.isVerified == false) {
                navigate("/vendor/activation")
            }
            else if (isAuth == false) {
                navigate("/vendor/login")
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