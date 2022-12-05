import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTE } from "../../constant/route";
import { useSelector } from "react-redux";
import NavBar from "../NavBar";

const PrivateRoute = function PrivateRoute(props) {
  const userInfo = useSelector((s) => s.auth.userInfo);
  const navigate = useNavigate();

  useEffect(() => {
    // set title
    document.title = props.title;
  }, [props.title]);

  useEffect(() => {
    if (!userInfo) {
      navigate(ROUTE.LOGIN);
    }
  }, [navigate, userInfo]);

  return (
    <>
      <NavBar />
      {props.children}
    </>
  );
};

export default PrivateRoute;
