import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

export default function TextEditor({ value, setValue }) {
  return (
    <ReactQuill
      style={{ height: 300 }}
      theme="snow"
      value={value}
      onChange={setValue}
    />
  );
}
