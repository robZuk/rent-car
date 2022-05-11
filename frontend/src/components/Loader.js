import React from "react";

function Loader() {
  return (
    <div className="container d-flex justify-content-center align-items-center ">
      <div
        className="spinner-border spinner-border-sm text-secondary my-2"
        style={{ width: "50px", height: "50px" }}
        role="status"
      >
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
}

export default Loader;
