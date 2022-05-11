import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { listOrders } from "../actions/orderActions";

function OrderListScreen() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const orderList = useSelector((state) => state.orderList);
  const { loading, error, orders } = orderList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    dispatch(listOrders());
  }, [dispatch, navigate, userInfo]);

  return (
    <div className="container-lg">
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="alert-danger">{error}</Message>
      ) : (
        <div className="table-responsive my-5">
          <h4>Orders</h4>
          <table
            className="table table-striped table-hover table-bordered align-middle"
            style={{
              textAlign: "center",
            }}
          >
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">USER</th>
                <th scope="col">DATE</th>
                <th scope="col">TOTAL</th>
                <th scope="col">PAYMENT ON ACCOUNT</th>
                <th scope="col">PAID</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td className="text-nowrap">
                    {order.user && order.user.name}
                  </td>
                  <td className="text-nowrap">
                    {order.createdAt.substring(0, 10)}
                  </td>
                  <td>${order.totalPrice}</td>
                  <td>${order.paymentOnAccount}</td>
                  <td className="text-nowrap">
                    {order.isPaid ? (
                      order.paidAt.substring(0, 10)
                    ) : (
                      <i className="bi bi-x fs-4" style={{ color: "red" }}></i>
                    )}
                  </td>

                  <td>
                    <button
                      type="button"
                      className="btn btn-cardialred btn-sm"
                      onClick={() => navigate(`/order/${order._id}`)}
                    >
                      Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default OrderListScreen;
