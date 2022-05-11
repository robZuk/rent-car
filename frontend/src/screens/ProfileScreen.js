import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { getUserDetails, updateUserProfile } from "../actions/userActions";
import { listMyOrders } from "../actions/orderActions";
import { USER_UPDATE_PROFILE_RESET } from "../constants/userConstants";

function ProfileScreem() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const orderDetails = useSelector((state) => state.orderDetails);

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const { success } = userUpdateProfile;

  const orderListMy = useSelector((state) => state.orderListMy);
  const { loading: loadingOrders, error: errorOrders, orders } = orderListMy;

  const { order } = orderDetails;

  useEffect(() => {
    if (order && order.isPaid) {
      dispatch(listMyOrders());
    }

    if (!user || !user.name || success) {
      dispatch({ type: USER_UPDATE_PROFILE_RESET });
      dispatch(getUserDetails("profile"));
      dispatch(listMyOrders());
    } else {
      setName(user.name);
      setEmail(user.email);
    }
  }, [dispatch, navigate, user, success, order]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
    } else {
      dispatch(updateUserProfile({ id: user._id, name, email, password }));
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div
          className="col-12 col-md-8 col-lg-6"
          style={{
            border: ".5px solid lightgray",
            borderRadius: "5px",
            padding: "30px",
          }}
        >
          <h4>User Profile</h4>
          {message && <Message variant="alert-danger">{message}</Message>}
          {success && (
            <Message variant="alert-success">Profile Updated</Message>
          )}
          {loading ? (
            <Loader />
          ) : error ? (
            <Message variant="danger">{error}</Message>
          ) : (
            <form onSubmit={submitHandler}>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  placeholder="Enter name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email Address
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="confirmPassword" className="form-label">
                  Confirm Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="confirmPpassword"
                  placeholder="Confirm password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
              <button type="submit" className="btn btn-cardialred mt-3">
                Update Profile
              </button>
            </form>
          )}
        </div>
      </div>
      <div className="row justify-content-center">
        <div className="col-12 mt-5">
          <h4 className="mb-3">My Orders</h4>
          {loadingOrders ? (
            <Loader />
          ) : errorOrders ? (
            <Message variant="alert-danger">{errorOrders}</Message>
          ) : (
            <table
              className="table table-striped align-middle text-align-center responsive table-bordered"
              style={{
                textAlign: "center",
              }}
            >
              <thead>
                <tr>
                  <th>ID</th>
                  <th>DATE</th>
                  <th>TOTAL</th>
                  <th>PAID ON ACCOUNT</th>
                  <th>PAID</th>
                  <th>DETAILS</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order._id}>
                    <td>{order._id}</td>
                    <td className="text-nowrap">
                      {order.createdAt.substring(0, 10)}
                    </td>
                    <td>{`${order.totalPrice} $`}</td>
                    <td>{`${order.paymentOnAccount} $`}</td>
                    <td className="text-nowrap">
                      {order.isPaid ? (
                        order.paidAt.substring(0, 10)
                      ) : (
                        <i
                          className="bi bi-x fs-4"
                          style={{
                            color: "red",
                          }}
                        ></i>
                      )}
                    </td>

                    <td>
                      <Link to={`/order/${order._id}`}>
                        <button
                          className="btn-sm btn-cardialred"
                          variant="light"
                        >
                          Details
                        </button>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProfileScreem;
