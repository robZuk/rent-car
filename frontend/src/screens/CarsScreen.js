import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { listCars } from "../actions/carActions";
import Car from "../components/Car";

function CarsScreen() {
  const { keyword } = useParams();

  const dispatch = useDispatch();

  const carList = useSelector((state) => state.carList);
  const { loading, error, cars } = carList;

  useEffect(() => {
    dispatch(listCars(keyword));
  }, [dispatch, keyword]);

  return (
    <div className="container">
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="alert-danger">{error}</Message>
      ) : (
        <div className="row">
          {cars.map((car) => (
            <div className="col-xl-3 col-lg-4 col-md-6 col-sm-12" key={car._id}>
              <Car car={car} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default CarsScreen;
