import React from "react";
import { useNavigate } from "react-router-dom";

function ConfirmMessage() {
  const navigate = useNavigate();

  return (
    <div
      className="container d-flex  justify-content-center align-items-center"
      style={{ height: "80vh" }}
    >
      <div className=" ">
        <div className="card">
          <h5 className="card-header">Confirmation of sending the message</h5>
          <div className="card-body">
            <p className="card-text fs-5 my-3 text-secondary">
              Your message has been sent successfully !!!
            </p>
            <button
              type="button"
              className="btn btn-cardialred"
              onClick={() => navigate("/")}
            >
              Home page
            </button>
            <button
              type="button"
              className="btn btn-light m-3"
              onClick={() => navigate("/contact")}
            >
              Send message again
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ConfirmMessage;
