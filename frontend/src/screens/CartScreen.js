import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import ModalCalendar from "../components/ModalCalendar";
import { removeFromCart } from "../actions/cartActions";

function Cartscreen() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    navigate("/payment");
  };

  return (
    <div className="container-lg">
      <div className="row justify-content-center">
        <div className="col-lg-10">
          <h4>Cart</h4>
          {cartItems.length === 0 ? (
            <Message>
              Your cart is empty <Link to="/cars"> Go Back</Link>
            </Message>
          ) : (
            <>
              <Link to="/cars" className="btn btn-light my-3 mx-0">
                Go Back
              </Link>
              <div className="table-responsive">
                <table
                  className="table align-middle"
                  style={{
                    textAlign: "center",
                  }}
                >
                  <tbody>
                    {cartItems.map((item) => (
                      <tr key={item.car}>
                        <td>
                          <img
                            src={item.image}
                            alt={item.name}
                            style={{ width: "100px" }}
                          />
                        </td>
                        <td>
                          <Link
                            className="text-decoration-none text-cardialred"
                            to={`/cars/${item.car}`}
                          >
                            {item.name}
                          </Link>
                        </td>
                        <td>
                          <strong>${item.price}/day</strong>
                        </td>
                        <td className="text-nowrap">
                          Reserved days:{" "}
                          {item.reservedDays.map((date, index) => (
                            <div key={index} className="text-nowrap">
                              {date}
                            </div>
                          ))}
                        </td>
                        <td>
                          <button
                            className="btn btn-sm btn-cardialred "
                            data-bs-toggle="modal"
                            data-bs-target="#modalCalendar"
                            style={{ width: "110px" }}
                          >
                            Correct dates
                          </button>
                        </td>
                        <td>
                          <span
                            className="tt"
                            data-bs-placement="bottom"
                            title="Remove position"
                          >
                            <button
                              className="btn"
                              onClick={() => removeFromCartHandler(item.car)}
                            >
                              <i className="bi bi-trash3-fill fs-5"></i>
                            </button>
                            <ModalCalendar id={item.car} />
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="col-md-4">
                <ul className="list-group mt-3">
                  <li className="list-group-item">
                    <h5>Subtotal</h5>$
                    {cartItems
                      .reduce(
                        (acc, item) =>
                          acc + item.price * item.reservedDays.length,
                        0
                      )
                      .toFixed(2)}
                  </li>
                  <li className="list-group-item">
                    <h5>Payment on Account</h5>$
                    {cartItems
                      .reduce(
                        (acc, item) =>
                          acc + item.price * item.reservedDays.length,
                        0
                      )
                      .toFixed(2) * 0.2}
                  </li>
                  <li className="list-group-item">
                    <button
                      className="btn btn-cardialred my-3"
                      onClick={checkoutHandler}
                    >
                      Proceed To Checkout
                    </button>
                  </li>
                </ul>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Cartscreen;
