import React from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import {useSelector} from 'react-redux'


const SemiProtected = (props) => {
  const { Component } = props;

  const navigate = useNavigate();

  const {user, isAuth} = useSelector((state) => state.auth);

  useEffect(() => {
    function checkLogin(){
        if (isAuth !== true){ 
            navigate("/")
        }if(isAuth===true && user.activated==true){
            navigate("/rooms")
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
