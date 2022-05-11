import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Message from "../components/Message";
import Loader from "../components/Loader";
import ModalCalendar from "../components/ModalCalendar";
import Modal from "../components/Modal";
import { listCarDetails } from "../actions/carActions";

function CarScreen() {
  const [modalShow, setModalShow] = useState(false);
  // const [modalShow, setModalShow] = useState(false);

  const dispatch = useDispatch();
  const params = useParams();

  const carDetails = useSelector((state) => state.carDetails);
  const { loading, error, car } = carDetails;

  useEffect(() => {
    if (car !== undefined && (!car._id || car._id !== params.id)) {
      dispatch(listCarDetails(params.id));
    }
  }, [dispatch, car, car._id, params.id]);

  return (
    <div className="container">
      <Link className="btn btn-light mb-2" to="/cars">
        Go Back
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="alert-danger">{error}</Message>
      ) : (
        <>
          {/* <Meta title={car.name} /> */}
          <div className="row">
            <div className="col-md-7">
              <div
                id="carouselExampleIndicators"
                className="carousel slide"
                data-bs-ride="carousel"
              >
                <div className="carousel-indicators">
                  {car.images &&
                    car.images.map((image, i) => (
                      <button
                        key={i}
                        type="button"
                        data-bs-target="#carouselExampleIndicators"
                        data-bs-slide-to={i}
                        className={i === 0 ? "active" : ""}
                        aria-current={i === 0 ? "true" : ""}
                        aria-label="Slide 1"
                      ></button>
                    ))}
                </div>
                <div className="carousel-inner">
                  {car.images &&
                    car.images.map((image, i) => (
                      <div
                        className={
                          i === 0 ? "carousel-item active" : "carousel-item"
                        }
                        key={i}
                      >
                        <img src={image} className="d-block w-100" alt="..." />
                      </div>
                    ))}
                </div>
                <button
                  className="carousel-control-prev"
                  type="button"
                  data-bs-target="#carouselExampleIndicators"
                  data-bs-slide="prev"
                >
                  <span
                    className="carousel-control-prev-icon"
                    aria-hidden="true"
                  ></span>
                  <span className="visually-hidden">Previous</span>
                </button>
                <button
                  className="carousel-control-next"
                  type="button"
                  data-bs-target="#carouselExampleIndicators"
                  data-bs-slide="next"
                >
                  <span
                    className="carousel-control-next-icon"
                    aria-hidden="true"
                  ></span>
                  <span className="visually-hidden">Next</span>
                </button>
              </div>
            </div>

            <div className="col-md-5">
              <ul className="list-group list-group-flush">
                <li className="list-group-item py-0 mt-3">
                  <h4>{car.name}</h4>
                </li>

                <li className="list-group-item px-3 py-2">
                  Category: {car.category}
                </li>
                <li className="list-group-item px-3 py-2">Fuel: {car.fuel}</li>
                <li className="list-group-item px-3 py-2">
                  Engine: {car.engine}
                </li>
                <li className="list-group-item px-3 py-2">
                  Gearbox: {car.gearbox}
                </li>
                <li className="list-group-item px-3 py-2">
                  Acceleration: 0-100kmph {car.acceleration}s
                </li>
                <li className="list-group-item px-3 py-2">
                  Price per day: $ {car.price}
                </li>
                <div>
                  <button
                    className="btn btn-cardialred mt-4"
                    data-bs-toggle="modal"
                    data-bs-target="#modalCalendar"

                    // onClick={() => setModalShow(true)}
                    // style={{ width: "100px" }}
                  >
                    Reserve
                  </button>
                </div>
                <ModalCalendar id={params.id} />
                {/* <ModalCalendar
                  id={params.id}
                  show={modalShow}
                  onHide={() => setModalShow(false)}
                /> */}
              </ul>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default CarScreen;
