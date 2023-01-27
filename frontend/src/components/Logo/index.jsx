import React from "react";
import { Link } from "react-router-dom";
import { useStyles } from "./index.css";

function Logo() {
  const classes = useStyles({});

  return (
    <div className={classes.logo}>
      <Link to="/">
        <svg
          width="40"
          height="40"
          viewBox="0 0 50 50"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M20 0C8.95431 0 0 8.9543 0 20V30C0 41.0457 8.9543 50 20 50H30C41.0457 50 50 41.0457 50 30V20C50 8.95431 41.0457 0 30 0H20ZM33 12.4698L19.8375 25.2607C17.824 23.3025 17.824 20.1385 19.8375 18.1804L25.7195 12.4602C27.733 10.5117 30.9865 10.5117 33 12.4698ZM19.5102 38.881L29.0225 29.6304C31.0361 27.6722 31.0361 24.5083 29.0225 22.5501L19.5102 31.8008C17.4966 33.7589 17.4966 36.9229 19.5102 38.881ZM31.3336 26.0902C31.3336 25.8008 31.3039 25.5115 31.2642 25.2317C32.0676 27.0645 31.7006 29.2542 30.1731 30.7493L20.6608 40C20.4624 39.8071 20.2839 39.5949 20.1252 39.3826L29.5978 30.1706C30.7186 29.0805 31.3336 27.6336 31.3336 26.0902ZM28.1595 22.2993L23.944 26.4085L20.7104 25.5018L24.9755 21.3636L28.1595 22.2993Z"
            fill="#1967D2"
          ></path>
        </svg>
        <span style={{fontWeight: "bolder"}}>InternShip</span>
      </Link>
    </div>
  );
}

export default Logo;
