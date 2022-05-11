import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "@hassanmojab/react-modern-calendar-datepicker/lib/DatePicker.css";
import { Calendar, utils } from "@hassanmojab/react-modern-calendar-datepicker";
import { addToCart } from "../actions/cartActions";

function ModalCalendar({
  id,
  staticContext,
  setReservedDatesByAdmin,
  // ...props
}) {
  const dispatch = useDispatch();

  const carDetails = useSelector((state) => state.carDetails);
  const { car } = carDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const [selectedDays, setSelectedDays] = useState([]);

  const location = useLocation();
  const navigate = useNavigate();

  //transform year, month and day to one string and push to new array
  const reservedDates = [];
  // console.log(reservedDates);
  // console.log(selectedDays);
  // console.log(setreserveddates);
  // console.log(staticContext);

  selectedDays.map((item) =>
    reservedDates.push(
      `${item.year}-${item.month > 9 ? item.month : `0${item.month}`}-${
        item.day > 9 ? item.day : `0${item.day}`
      }`
    )
  );

  const disabledDays = [];

  const handleDisabledSelect = () => {
    toast.error(`Tried selecting a disabled day`);
  };
  // useEffect(() => {
  //   car.reservedDays &&
  //     location.pathname !== `/admin/car/${id}/edit` &&
  //     car.reservedDays.forEach((item) => {
  //       disabledDays.push({
  //         year: new Date(item).getUTCFullYear(),
  //         month: new Date(item).getUTCMonth() + 1,
  //         day: new Date(item).getUTCDate(),
  //       });
  //     });
  // }, [car.reservedDays, disabledDays, id, location]);

  car.reservedDays &&
    location.pathname !== `/admin/car/${id}/edit` &&
    car.reservedDays.forEach((item) => {
      disabledDays.push({
        year: new Date(item).getUTCFullYear(),
        month: new Date(item).getUTCMonth() + 1,
        day: new Date(item).getUTCDate(),
      });
    });

  const reservationHandler = (e) => {
    e.preventDefault();
    if (location.pathname === `/admin/car/${id}/edit`) {
      setReservedDatesByAdmin([...reservedDates]);
      setSelectedDays([]);
    } else if (userInfo) {
      navigate(`/cart/${id}`);
      dispatch(addToCart(id, reservedDates));
      setSelectedDays([]);
    } else navigate("/login");
  };

  return (
    <div
      className="modal fade"
      id="modalCalendar"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabIndex="-1"
      aria-labelledby="staticBackdropLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-lg modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="staticBackdropLabel">
              Reservation days
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body d-flex justify-content-center">
            <Calendar
              // {...props}
              value={selectedDays}
              onChange={setSelectedDays}
              disabledDays={disabledDays}
              minimumDate={utils().getToday()}
              onDisabledDayError={handleDisabledSelect}
              shouldHighlightWeekends
              colorPrimary="#c41e3a"
            />
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-light"
              data-bs-dismiss="modal"
            >
              Close
            </button>
            <button
              type="button"
              className={
                selectedDays.length === 0 &&
                location.pathname !== `/admin/car/${id}/edit`
                  ? "btn btn-cardialred disabled"
                  : "btn btn-cardialred"
              }
              onClick={reservationHandler}
              data-bs-dismiss="modal"
            >
              Reserve
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModalCalendar;
