import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Message from "../components/Message";
import CheckoutSteps from "../components/CheckoutSteps";
import { createOrder } from "../actions/orderActions";
import { ORDER_CREATE_RESET } from "../constants/orderConstants";
import { USER_DETAILS_RESET } from "../constants/userConstants";
// import { CAR_DETAILS_RESET } from "../constants/carConstants";

function PlaceOrderScreen() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cart = useSelector((state) => state.cart);

  //   Calculate prices
  const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2);
  };

  const totalPrice = (cart.itemsPrice = addDecimals(
    cart.cartItems.reduce(
      (acc, item) => acc + item.price * item.reservedDays.length,
      0
    )
  ));

  const paymentOnAccount = (0.2 * totalPrice).toFixed(2);

  const orderCreate = useSelector((state) => state.orderCreate);
  const { order, success, error } = orderCreate;

  useEffect(() => {
    !cart.paymentOnAccountMethod && navigate("/payment");

    if (success && order) {
      navigate(`/order/${order._id}`);
      dispatch({ type: USER_DETAILS_RESET });
      // dispatch({ type: ORDER_CREATE_RESET });
    }
  }, [success, dispatch, navigate, order, cart.paymentOnAccountMethod]);

  const placeOrderHandler = () => {
    dispatch(
      createOrder({
        orderItems: cart.cartItems,
        paymentOnAccountMethod: cart.paymentOnAccountMethod,
        totalPrice,
        paymentOnAccount,
      })
    );
  };

  return (
    <div
      className="container"
      // style={{
      //   height: "40vh",
      //   marginTop: "20vh",
      // }}
    >
      <CheckoutSteps step1 step2 step3 />
      <div className="container">
        <div className="row d-flex justify-content-center">
          <div className="col-lg-10">
            <ul
              className="list-group-flush"
              style={{ margin: "0", padding: "0" }}
            >
              <li className="list-group-item">
                <h4>Payment Method</h4>
                <strong>Method: </strong>
                {cart.paymentOnAccountMethod}
              </li>
              <li className="list-group-item">
                <h4>Order Items</h4>
                {cart.cartItems.length === 0 ? (
                  <Message>Your cart is empty</Message>
                ) : (
                  <div className="table-responsive">
                    <table
                      className="table align-middle"
                      style={{
                        textAlign: "center",
                      }}
                    >
                      <tbody>
                        {cart.cartItems.map((item) => (
                          <tr key={item.car}>
                            <td>
                              <img
                                src={item.image}
                                alt={item.name}
                                style={{ width: "100px" }}
                              />
                            </td>
                            <td className="text-nowrap">
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
                              {item.reservedDays.length} x ${item.price} = $
                              {(item.reservedDays.length * item.price).toFixed(
                                2
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </li>
            </ul>
            <div className="col-md-6 mt-5">
              {error && <Message variant="danger">{error}</Message>}
              <ul
                className="list-group-flush"
                style={{ margin: "0", padding: "0" }}
              >
                <li className="list-group-item">
                  <h4>Order Summary</h4>
                </li>
                <li className="list-group-item">
                  <div className="row">
                    <div className="col-8">Total:</div>
                    <strong className="col-4">${totalPrice}</strong>
                  </div>
                </li>
                <li className="list-group-item">
                  <div className="row">
                    <div className="col-8">Payment On Account:</div>
                    <strong className="col-4">${paymentOnAccount}</strong>
                  </div>
                </li>
                <li className="list-group-item mt-3">
                  <button
                    type="button"
                    className={
                      cart.cartItems === 0
                        ? "btn btn-cardialred disabled"
                        : "btn btn-cardialred"
                    }
                    onClick={placeOrderHandler}
                  >
                    Place Order
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PlaceOrderScreen;
