import React, { useState, useEffect } from "react";
import axios from "axios";
import { PayPalButton } from "react-paypal-button-v2";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { getOrderDetails, payOrder } from "../actions/orderActions";
import { carReservation } from "../actions/carActions";
import { listCarDetails } from "../actions/carActions";
import { ORDER_PAY_RESET } from "../constants/orderConstants";
import { CAR_DETAILS_RESET } from "../constants/carConstants";
import { ORDER_CREATE_RESET } from "../constants/orderConstants";

function OrderScreen() {
  const params = useParams();
  const orderId = params.id;

  const [sdkReady, setSdkReady] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // const orderCreate = useSelector((state) => state.orderCreate);
  // const { order: createOrder } = orderCreate;
  // console.log(orderCreate);

  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;

  // console.log(order.paymentOnAccountMethod);
  const orderCreate = useSelector((state) => state.orderCreate);
  const {
    order: createOrder,
    success: orderSuccess,
    error: errorOrder,
  } = orderCreate;

  const paidDate = new Date(order?.paidAt);

  const carReservationState = useSelector((state) => state.carReservation);
  const { success } = carReservationState;

  const orderPay = useSelector((state) => state.orderPay);
  const { loading: loadingPay, success: successPay } = orderPay;

  // const userLogin = useSelector((state) => state.userLogin);
  // const { userInfo } = userLogin;

  if (!loading) {
    //   Calculate prices
    const addDecimals = (num) => {
      return (Math.round(num * 100) / 100).toFixed(2);
    };

    order.itemsPrice = addDecimals(
      order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0)
    );
  }

  useEffect(() => {
    const addPayPalScript = async () => {
      const { data: clientId } = await axios.get("/api/config/paypal");
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
      script.async = true;
      script.onload = () => {
        setSdkReady(true);
      };
      document.body.appendChild(script);
    };

    // if (successPay) {
    //   order.orderItems.forEach((item) =>
    //     dispatch(
    //       carReservation(item.car, {
    //         dates: [...item.reservedDays],
    //       })
    //     )
    //   );
    // }
    //order?.orderItems.forEach((item) => {
    createOrder?.orderItems.forEach((item) => {
      dispatch(
        carReservation(item.car, {
          dates: [...item.reservedDays],
        })
      );
      dispatch(listCarDetails(item.car));
      dispatch({ type: ORDER_CREATE_RESET });
    });

    // console.log(success);
    // order?.orderItems.forEach((item) => console.log(item.car, success));

    if (!order || successPay || order._id !== orderId) {
      dispatch({ type: ORDER_PAY_RESET });
      dispatch(getOrderDetails(orderId));
    } else if (!order.isPaid) {
      if (!window.paypal) {
        addPayPalScript();
      } else {
        setSdkReady(true);
      }
    }
  }, [dispatch, orderId, successPay, order, navigate, createOrder]);

  const successPaymentHandler = (paymentResult) => {
    dispatch(payOrder(orderId, paymentResult));
  };

  return (
    <div className="container-md">
      <div className="row d-flex justify-content-center">
        <div className="col-lg-10">
          {loading ? (
            <Loader />
          ) : error ? (
            <Message variant="alert-danger">{error}</Message>
          ) : (
            <>
              <h4>Order: {order._id}</h4>
              <ul
                className="list-group-flush"
                style={{ margin: "0", padding: "0" }}
              >
                <li className="list-group-item">
                  <h4>Payment On Account</h4>
                  <strong>Method: </strong>
                  {order.paymentOnAccountMethod}
                  {order.isPaid ? (
                    <Message variant="alert-success">
                      Paid on {paidDate.toDateString()}{" "}
                      {paidDate.toTimeString().slice(0, 8)}
                    </Message>
                  ) : (
                    <Message variant="alert-danger">Not Paid</Message>
                  )}
                </li>
                <li className="list-group-item">
                  <h4>Order Items</h4>
                  {order.orderItems.length === 0 ? (
                    <Message>Order is empty</Message>
                  ) : (
                    <div className="table-responsive">
                      <table
                        className="table align-middle"
                        style={{
                          textAlign: "center",
                        }}
                      >
                        <tbody>
                          {order.orderItems.map((item) => (
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
                              <td className="text-nowrap">
                                Reserved days:{" "}
                                {item.reservedDays.map((date, index) => (
                                  <div key={index} className="text-nowrap">
                                    {date}
                                  </div>
                                ))}
                              </td>
                              <td className="text-nowrap">
                                {item.reservedDays.length} x ${item.price} = $
                                {(
                                  item.reservedDays.length * item.price
                                ).toFixed(2)}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </li>
              </ul>
            </>
          )}
          {/* </div> */}
          {/* </div> */}
          {/* <div className="container">
          <div className="row d-flex justify-content-center"> */}
          <div className="col-sm-5">
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
                  <strong className="col-4">${order?.totalPrice}</strong>
                </div>
              </li>
              <li className="list-group-item">
                <div className="row">
                  <div className="col-8">Payment On Account:</div>
                  <strong className="col-4">${order?.paymentOnAccount}</strong>
                </div>
              </li>
              <li className="list-group-item">
                {order?.paymentOnAccountMethod === "PayPal" && (
                  <>
                    {loadingPay && <Loader />}
                    {!sdkReady ? (
                      <Loader />
                    ) : (
                      <PayPalButton
                        amount={order.paymentOnAccount}
                        onSuccess={successPaymentHandler}
                      />
                    )}
                  </>
                )}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    // </div>
  );
}

export default OrderScreen;
