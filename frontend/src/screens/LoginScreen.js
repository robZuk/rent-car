import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import Loader from "../components/Loader";
import { login } from "../actions/userActions";
import { USER_ERROR_RESET } from "../constants/userConstants";
// import { login, reset } from "../redux/auth/authSlice";

//dggd
function LoginScreen() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const {
    register,
    handleSubmit,
    formState: { errors: useFormErrors, isSubmitted },
  } = useForm();

  // const { user, isLoading, isError, isSuccess, message } = useSelector(
  //   (state) => state.auth
  // );

  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  useEffect(() => {
    userInfo && navigate("/cars");

    error && toast.error(error);
    error && dispatch({ type: USER_ERROR_RESET });

    // dispatch(reset());
    // useFormErrors.email?.type === "required" &&
    //   toast.error("Please enter an email");
    // useFormErrors.password?.type === "required" &&
    //   toast.error("Please enter a password");
  }, [error, navigate, dispatch, userInfo]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const submitHandler = (e) => {
    //e.preventDefault();

    dispatch(login(email, password));
  };

  return (
    <div
      className="container"
      style={{
        height: "40vh",
        marginTop: "10vh",
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
          <h4>Sign In</h4>
          {loading && <Loader />}

          <form onSubmit={handleSubmit(submitHandler)}>
            <label htmlFor="email" className="form-label">
              Email address
            </label>
            <div className="input-group mb-3">
              <span className="input-group-text">
                <i className="bi bi-envelope-fill text-secondary"></i>
              </span>
              <input
                {...register("email", {
                  required: true,
                })}
                type="email"
                placeholder="Enter an email"
                className={`form-control ${
                  useFormErrors.email && `is-invalid`
                }`}
                id="email"
                value={email}
                onChange={onChange}
              />
              {useFormErrors.email?.type === "required" && (
                <div className="invalid-feedback">Please enter an email.</div>
              )}
            </div>
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <div className="input-group mb-3">
              <span className="input-group-text">
                <i className="bi bi-lock-fill text-secondary"></i>
              </span>
              <input
                {...register("password", {
                  required: true,
                })}
                type="password"
                placeholder="Enter a password"
                className={`form-control ${
                  useFormErrors.password && `is-invalid`
                }`}
                id="password"
                value={password}
                onChange={onChange}
              />
              {useFormErrors.password?.type === "required" && (
                <div className="invalid-feedback">Please enter a password.</div>
              )}
            </div>
            <button type="submit" className="btn btn-cardialred mt-3">
              Sign In
            </button>
          </form>
        </div>
        <div className="my-3 text-center">
          New Customer?{" "}
          <Link className="text-cardialred " to="/register">
            Register
          </Link>
        </div>
      </div>
    </div>
  );
}

export default LoginScreen;
