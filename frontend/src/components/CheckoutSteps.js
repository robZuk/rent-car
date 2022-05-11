import React from "react";
import { Link } from "react-router-dom";

function CheckoutSteps({ step1, step2, step3 }) {
  return (
    <div>
      <ul className="nav justify-content-center">
        <li className="nav-item">
          <Link
            className={`nav-link ${
              step1 ? `active text-cardialred` : `disabled`
            }`}
            aria-current="page"
            to="/login"
          >
            Sign In
          </Link>
        </li>
        <li className="nav-item">
          <Link
            className={`nav-link ${
              step2 ? `active text-cardialred` : `disabled`
            }`}
            aria-current="page"
            to="/payment"
          >
            Payment
          </Link>
        </li>
        <li className="nav-item">
          <Link
            className={`nav-link ${
              step3 ? `active text-cardialred` : `disabled`
            }`}
            aria-current="page"
            to="/placeorder"
          >
            Place Order
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default CheckoutSteps;
