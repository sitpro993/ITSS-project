import React, { Component, useEffect } from "react";
import GTranslateIcon from "@mui/icons-material/GTranslate";
import { Button } from "@mui/material";

export default function GoogleTranslate() {
  const googleTranslateElementInit = () => {
    new window.google.translate.TranslateElement(
      {
        pageLanguage: "vn",
        autoDisplay: false,
      },
      "google_translate_element"
    );
  };
  useEffect(() => {
    var addScript = document.createElement("script");
    addScript.setAttribute(
      "src",
      "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
    );
    document.body.appendChild(addScript);
    window.googleTranslateElementInit = googleTranslateElementInit;
  }, []);

  return (
    <>
      <div id="google_translate_element"></div>
    </>
  );
}
