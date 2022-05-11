import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Toast } from "bootstrap";

import Message from "../components/Message";
import Loader from "../components/Loader";
import { listCars, deleteCar, createCar } from "../actions/carActions";
import { CAR_CREATE_RESET } from "../constants/carConstants";

function CarListScreen() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [toast, setToast] = useState(false);
  const toastRef = useRef();

  const [carId, setCarId] = useState("");
  const [carName, setCarName] = useState("");

  const carList = useSelector((state) => state.carList);
  const { loading, error, cars } = carList;

  const carDelete = useSelector((state) => state.carDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = carDelete;

  const carCreate = useSelector((state) => state.carCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    car: createdCar,
  } = carCreate;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

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

    dispatch({ type: CAR_CREATE_RESET });

    // (!userInfo || !userInfo.isAdmin) && navigate("/login");

    successCreate
      ? navigate(`/admin/car/${createdCar._id}/edit`)
      : dispatch(listCars(""));
  }, [
    dispatch,
    navigate,
    userInfo,
    successDelete,
    successCreate,
    createdCar,
    toast,
  ]);

  const deleteHandler = (id) => {
    dispatch(deleteCar(id));
  };

  const createCarHandler = () => {
    dispatch(createCar());
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
          <strong className="me-auto">Delete Car</strong>

          <button
            type="button"
            className="btn-close"
            aria-label="Close"
            onClick={() => setToast((toast) => !toast)}
          ></button>
        </div>
        <div className="toast-body">
          {`Are you sure delete  ${carName} ?`}
          <div className="mt-2 pt-2 border-top">
            <button
              type="button"
              className="btn btn-cardialred btn-sm"
              onClick={() => {
                deleteHandler(carId);
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

      <div className="row d-flex">
        <div className="col-6">
          <h4>Cars</h4>
        </div>
        <div className="col-6 d-flex justify-content-end">
          <button
            type="button"
            className="btn btn-cardialred"
            onClick={createCarHandler}
          >
            <i className="bi bi-plus-lg"></i> Create Car
          </button>
        </div>
      </div>
      {loadingDelete && <Loader />}
      {errorDelete && <Message variant="alert-danger">{errorDelete}</Message>}
      {loadingCreate && <Loader />}
      {errorCreate && <Message variant="alert-danger">{errorCreate}</Message>}
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
                <th scope="col">PRICE</th>
                <th scope="col">CATEGORY</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {cars.map((car) => (
                <tr key={car._id}>
                  <td>{car._id}</td>
                  <td className="text-nowrap">{car.name}</td>
                  <td>${car.price}</td>
                  <td>
                    {car.isAdmin ? (
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
                      onClick={() => navigate(`/admin/car/${car._id}/edit`)}
                    >
                      <i className="bi bi-pencil-square fs-4"></i>
                    </button>
                    <button
                      type="button"
                      className="btn fs-4"
                      onClick={() => {
                        setToast((toast) => !toast);
                        setCarId(car._id);
                        setCarName(car.name);
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

export default CarListScreen;
