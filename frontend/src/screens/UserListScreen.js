import React, { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { listUsers, deleteUser } from "../actions/userActions";
import { Toast } from "bootstrap";

function UserListScreen() {
  const [toast, setToast] = useState(false);
  const toastRef = useRef();

  const [userId, setUserId] = useState("");
  const [userName, setUserName] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userList = useSelector((state) => state.userList);
  const { loading, error, users } = userList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userDelete = useSelector((state) => state.userDelete);
  const { success: successDelete } = userDelete;

  useEffect(() => {
    let myToast = toastRef.current;
    let bsToast = Toast.getInstance(myToast);
    if (!bsToast) {
      // initialize Toast
      bsToast = new Toast(myToast, { autohide: false });
      // hide after init
      bsToast.hide();
      setToast(false);
    } else {
      // toggle
      toast ? bsToast.show() : bsToast.hide();
    }

    if (userInfo && userInfo.isAdmin) {
      dispatch(listUsers());
    }
  }, [dispatch, navigate, successDelete, userInfo, toast]);

  const deleteHandler = (id) => {
    dispatch(deleteUser(id));
  };

  return (
    <div className="container-md">
      <div
        id="liveToast"
        className="toast my-5"
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
        ref={toastRef}
        style={{ marginLeft: 0 }}
      >
        <div className="toast-header">
          <strong className="me-auto">Delete User</strong>

          <button
            type="button"
            className="btn-close"
            aria-label="Close"
            onClick={() => setToast((toast) => !toast)}
          ></button>
        </div>
        <div className="toast-body">
          {`Are you sure delete  ${userName} ?`}
          <div className="mt-2 pt-2 border-top">
            <button
              type="button"
              className="btn btn-cardialred btn-sm"
              onClick={() => {
                deleteHandler(userId);
                setToast((toast) => !toast);
              }}
            >
              Delete
            </button>
            <button
              type="button"
              className="btn btn-secondary btn-sm mx-2"
              onClick={() => setToast((toast) => !toast)}
            >
              Close
            </button>
          </div>
        </div>
      </div>

      <h4>Users</h4>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="alert-danger">{error}</Message>
      ) : (
        <div className="table-responsive my-5">
          <table
            className="table table-striped table-hover table-bordered align-middle"
            style={{
              textAlign: "center",
            }}
          >
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">NAME</th>
                <th scope="col">EMAIL</th>
                <th scope="col">ADMIN</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <td>{user._id}</td>
                  <td className="text-nowrap">{user.name}</td>
                  <td>
                    <Link
                      className="text-decoration-none text-cardialred"
                      to={`mailto:${user.email}`}
                    >
                      {user.email}
                    </Link>
                  </td>
                  <td>
                    {user.isAdmin ? (
                      <i
                        className="bi bi-check fs-4"
                        style={{ color: "green" }}
                      ></i>
                    ) : (
                      <i
                        className="bi bi-x fs-4"
                        style={{
                          color: "red",
                        }}
                      ></i>
                    )}
                  </td>
                  <td className="text-nowrap">
                    <button
                      type="button"
                      className="btn text-secondary"
                      onClick={() => navigate(`/admin/user/${user._id}/edit`)}
                    >
                      <i className="bi bi-pencil-square fs-4"></i>
                    </button>
                    <button
                      type="button"
                      className="btn fs-4"
                      onClick={() => {
                        setToast((toast) => !toast);
                        setUserId(user._id);
                        setUserName(user.name);
                      }}
                    >
                      <i
                        className="bi bi-trash3-fill"
                        style={{ color: "#c41e3a" }}
                      ></i>
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

export default UserListScreen;
