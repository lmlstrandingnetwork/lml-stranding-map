import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import csv from "csv";
import "./UploadPopup.css";

const Popup = (props) => {
  const handleClick = () => {
    props.toggle();
  };

  const onDrop = useCallback((acceptedFiles) => {
    console.log(acceptedFiles);
  }, []);

  const {
    isDragActive,
    getRootProps,
    getInputProps,
    isDragReject,
  } = useDropzone({
    onDrop,
    accept: ["text/csv", "application/json"],
  });

  return (
    <div className="popup">
      <div className="popup_content">
        <span className="close" onClick={handleClick}>
          &times;{" "}
        </span>

        <div className="text-center mt-5">
          <div className="container text-center mt-5">
            <div {...getRootProps()}>
              <input {...getInputProps()} />
              {!isDragActive && "Click here or drop a file to upload!"}
              {isDragActive && !isDragReject && "Drop it like it's hot!"}
              {isDragReject && "File type not accepted, sorry!"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Popup;
