import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { getUserDetails, updateUser } from "../actions/userActions";
import { USER_UPDATE_RESET } from "../constants/userConstants";

function UserEditScreen() {
  const params = useParams();
  const navigate = useNavigate();

  const userId = params.id;

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    isAdmin: false,
  });

  const { name, email, isAdmin } = formData;

  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userUpdate = useSelector((state) => state.userUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = userUpdate;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: USER_UPDATE_RESET });
      navigate("/admin/userlist");
    } else {
      if (!user.name || user._id !== userId) {
        dispatch(getUserDetails(userId));
      } else {
        setFormData((prevState) => ({
          ...prevState,
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin,
        }));
      }
    }
  }, [dispatch, navigate, userId, user, successUpdate]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(updateUser({ _id: userId, name, email, isAdmin }));
  };

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
      isAdmin: e.target.checked,
    }));
  };

  return (
    <div className="container">
      <Link to="/admin/userlist" className="btn btn-light my-3">
        Go Back
      </Link>
      <div
        className="container"
        style={{
          marginTop: "5vh",
        }}
      >
        <div className="row justify-content-center">
          <div
            className="col-12 col-md-8 col-lg-6"
            style={{
              border: ".5px solid lightgray",
              borderRadius: "5px",
              padding: "30px",
            }}
          >
            <h4>Edit User</h4>
            {loadingUpdate && <Loader />}
            {errorUpdate && (
              <Message variant="alert-danger">{errorUpdate}</Message>
            )}
            {loading ? (
              <Loader />
            ) : error ? (
              <Message variant="alert-danger">{error}</Message>
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
                    name="name"
                    placeholder="Enter name"
                    value={name}
                    onChange={onChange}
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
                    name="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={onChange}
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="isAdmin"
                    placeholder="Enter email"
                    checked={isAdmin}
                    onChange={onChange}
                  />
                  <label className="form-check-label mx-2" htmlFor="isAdmin">
                    Is Admin
                  </label>
                </div>

                <button type="submit" className="btn btn-cardialred mt-3">
                  Update User
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserEditScreen;
