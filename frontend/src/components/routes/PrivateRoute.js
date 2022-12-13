import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTE } from "../../constant/route";
import { useSelector } from "react-redux";
import NavBar from "../NavBar";
import { Container } from "@mui/material";

const PrivateRoute = function PrivateRoute(props) {
  const userInfo = useSelector((s) => s.auth.user);
  
  const navigate = useNavigate();
  
  useEffect(() => {
    // set title
    document.title = props.title;
  }, [props.title]);

  useEffect(() => {
    if (userInfo === null) {
      navigate(ROUTE.LOGIN);
    }
  }, [navigate, userInfo]);

  return (
    <>
      <NavBar />
      <Container>
      {props.children}
      </Container>
    </>
  );
};

export default PrivateRoute;
