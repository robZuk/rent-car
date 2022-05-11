import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import Loader from "../components/Loader";
import { register } from "../actions/userActions";

function RegisterScreen() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  const { name, email, password, password2 } = formData;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const {
    register: useFormRegister,
    handleSubmit,
    formState: { errors: useFormErrors },
  } = useForm();

  const userRegister = useSelector((state) => state.userRegister);
  let { loading, error, userInfo } = userRegister;

  useEffect(() => {
    userInfo && navigate("/cars");
    error && toast.error(error);
  }, [userInfo, navigate, error]);

  const submitHandler = () => {
    if (password !== password2) {
      toast.error("Passwords do not match");
    } else {
      dispatch(register(name, email, password));
    }
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
          <h4>Sign Up</h4>
          {loading && <Loader />}

          <form onSubmit={handleSubmit(submitHandler)}>
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <div className="input-group mb-3">
              <span className="input-group-text">
                <i className="bi bi-person-fill text-secondary"></i>
              </span>
              <input
                {...useFormRegister("name", {
                  required: true,
                })}
                type="text"
                placeholder="Enter a name"
                className={`form-control ${useFormErrors.name && `is-invalid`}`}
                name="name"
                id="name"
                value={name}
                onChange={onChange}
              />
              {useFormErrors.name?.type === "required" && (
                <div className="invalid-feedback">Please enter a name.</div>
              )}
            </div>
            <label htmlFor="email" className="form-label">
              Email address
            </label>
            <div className="input-group mb-3">
              <span className="input-group-text">
                <i className="bi bi-envelope-fill text-secondary"></i>
              </span>
              <input
                {...useFormRegister("email", {
                  required: true,
                })}
                type="email"
                placeholder="Enter an email"
                className={`form-control ${
                  useFormErrors.email && `is-invalid`
                }`}
                name="email"
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
                {...useFormRegister("password", {
                  required: true,
                })}
                type="password"
                placeholder="Enter password"
                className={`form-control ${
                  useFormErrors.password && `is-invalid`
                }`}
                name="password"
                id="password"
                value={password}
                onChange={onChange}
              />
              {useFormErrors.password?.type === "required" && (
                <div className="invalid-feedback">Please enter a password.</div>
              )}
            </div>
            <label htmlFor="password2" className="form-label">
              Confirm Password
            </label>
            <div className="input-group mb-3">
              <span className="input-group-text">
                <i className="bi bi-lock-fill text-secondary"></i>
              </span>
              <input
                {...useFormRegister("password2", {
                  required: true,
                })}
                type="password"
                placeholder="Confirm password"
                className={`form-control ${
                  useFormErrors.password2 && `is-invalid`
                }`}
                name="password2"
                id="password2"
                value={password2}
                onChange={onChange}
              />
              {useFormErrors.password2?.type === "required" && (
                <div className="invalid-feedback">Please confirm password.</div>
              )}
            </div>
            <button type="submit" className="btn btn-cardialred mt-3">
              Register
            </button>
          </form>
        </div>
        <div className="my-3 text-center">
          Have an Account?{" "}
          <Link className="text-cardialred " to="/login">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}

export default RegisterScreen;
