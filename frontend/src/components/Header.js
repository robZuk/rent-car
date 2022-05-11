/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
// import { logout, reset } from "../redux/auth/authSlice";
import { logout } from "../actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation, Link } from "react-router-dom";

function HeaderContainer() {
  const dispatch = useDispatch();

  const [keyword, setKeyword] = useState("");

  const navigate = useNavigate();
  const location = useLocation();

  // const { user } = useSelector((state) => state.auth);

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/cars/search/${keyword}`);
    } else {
      navigate("/cars");
    }
  };

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const logoutHandler = () => {
    dispatch(logout());

    navigate("/");
  };

  return (
    location.pathname !== "/" &&
    location.pathname !== "/contact" && (
      <div className="container-lg p-0">
        <nav className="navbar navbar-expand-lg navbar-dark bg-cardialred mb-4 p-2">
          <div className="container-fluid">
            <Link className="navbar-brand" to="/">
              CAR RENTAL
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav me-5 ms-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link
                    className="nav-link align-top"
                    aria-current="page"
                    to="/cart"
                  >
                    <i className="bi bi-cart-fill fs-5 me-3"></i>Cart
                  </Link>
                </li>
                {userInfo ? (
                  <li className="nav-item dropdown ms-2 mt-1">
                    <a
                      className="nav-link dropdown-toggle"
                      id="navbarDropdown"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      {userInfo.name}
                    </a>
                    <ul
                      className="dropdown-menu"
                      aria-labelledby="navbarDropdown"
                    >
                      <li>
                        <Link className="dropdown-item" to="/profile">
                          Profile
                        </Link>
                      </li>

                      <li>
                        <button
                          className="dropdown-item"
                          type="button"
                          onClick={logoutHandler}
                        >
                          Logout
                        </button>
                      </li>
                    </ul>
                  </li>
                ) : (
                  <li className="nav-item">
                    <Link className="nav-link" aria-current="page" to="/login">
                      <i className="bi bi-person-fill fs-5"></i> Sign In
                    </Link>
                  </li>
                )}
                {userInfo && userInfo.isAdmin && (
                  <li className="nav-item dropdown ms-2 mt-1">
                    <a
                      className="nav-link dropdown-toggle"
                      id="navbarDropdown"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      Admin
                    </a>
                    <ul
                      className="dropdown-menu"
                      aria-labelledby="navbarDropdown"
                    >
                      <li>
                        <Link className="dropdown-item" to="/admin/userlist">
                          Users
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item" to="/admin/carlist">
                          Cars
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item" to="/admin/orderlist">
                          Orders
                        </Link>
                      </li>
                    </ul>
                  </li>
                )}
              </ul>
              <form className="d-flex" onSubmit={submitHandler}>
                <input
                  className="form-control me-2"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                  style={{ maxWidth: "300px" }}
                />
                <button className="btn btn-outline-cardialred" type="submit">
                  <i className="bi bi-search" style={{ color: "white" }}></i>
                </button>
              </form>
            </div>
          </div>
        </nav>
      </div>
    )
  );
}

export default HeaderContainer;
