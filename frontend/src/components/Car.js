import React from "react";
import { Link } from "react-router-dom";

function Car({ car }) {
  return (
    <div className="card my-3 p-3">
      <Link to={`/cars/${car._id}`}>
        <img src={car.image} className="card-img-top" alt="..." />
      </Link>
      <div className="card-body">
        <Link to={`/cars/${car._id}`} className="text-decoration-none">
          <h5 className="text-cardialred ">{car.name}</h5>
        </Link>
        <div className="card-text fw-bold fs-5">${car.price} per day</div>
      </div>
    </div>
  );
}

export default Car;
