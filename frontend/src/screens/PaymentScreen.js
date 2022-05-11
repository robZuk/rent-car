import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import CheckoutSteps from "../components/CheckoutSteps";
import { savePaymentOnAccountMethod } from "../actions/cartActions";

function PaymentScreen() {
  const [paymentMethod, setPaymentMethod] = useState();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentOnAccountMethod(paymentMethod));
    navigate("/placeorder");
  };

  console.log(paymentMethod);

  return (
    <div
      className="container"
      // style={{
      //   height: "40vh",
      //   marginTop: "20vh",
      // }}
    >
      <CheckoutSteps step1 step2 />
      <div
        style={{
          height: "40vh",
          marginTop: "20vh",
        }}
      >
        <div className="d-flex flex-column align-items-center">
          <h4 className="mb-4">Payment Method</h4>
          <form
            style={{
              border: ".5px solid lightgray",
              borderRadius: "5px",
              padding: "30px",
            }}
            onSubmit={submitHandler}
          >
            <div className="form-check">
              <input
                className="form-check-input my-1"
                type="radio"
                name="flexRadioDisabled"
                id="paypal"
                // checked
                value="PayPal"
                onChange={(e) => {
                  setPaymentMethod(e.target.value);
                }}
              />
              <label className="form-check-label" htmlFor="paypal">
                PayPal or Credit Card
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="flexRadioDisabled"
                id="cash"
                value="Cash"
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              <label className="form-check-label" htmlFor="cash">
                Cash
              </label>
            </div>
            <button type="submit" className="btn btn-cardialred mt-3">
              Continue
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default PaymentScreen;
