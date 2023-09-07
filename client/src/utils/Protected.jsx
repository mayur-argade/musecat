import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {useSelector} from 'react-redux'


const Protected = (props) => {
  const { Component } = props;
  
  const navigate = useNavigate();
  
  const {user, isAuth} = useSelector((state) => state.auth);
  
  useEffect(() => {
    function protectedRoute() {
      if (isAuth === false) {
        navigate("/");
      }else if (isAuth===true && user.activated==false) {
        navigate("/activate")
      }
    }

    protectedRoute();
  }, [navigate]);

  return <div>
    <Component />
  </div>;
};

export default Protected;
