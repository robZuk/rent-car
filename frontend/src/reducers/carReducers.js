import {
  CAR_LIST_REQUEST,
  CAR_LIST_SUCCESS,
  CAR_LIST_FAIL,
  CAR_DETAILS_REQUEST,
  CAR_DETAILS_SUCCESS,
  CAR_DETAILS_FAIL,
  CAR_DETAILS_RESET,
  CAR_DELETE_REQUEST,
  CAR_DELETE_SUCCESS,
  CAR_DELETE_FAIL,
  CAR_CREATE_RESET,
  CAR_CREATE_FAIL,
  CAR_CREATE_SUCCESS,
  CAR_CREATE_REQUEST,
  CAR_UPDATE_REQUEST,
  CAR_UPDATE_SUCCESS,
  CAR_UPDATE_FAIL,
  CAR_UPDATE_RESET,
  CAR_RESERVATION_REQUEST,
  CAR_RESERVATION_SUCCESS,
  CAR_RESERVATION_FAIL,
  CAR_RESERVATION_RESET,
} from "../constants/carConstants";

export const carListReducer = (state = { cars: [] }, action) => {
  switch (action.type) {
    case CAR_LIST_REQUEST:
      return { loading: true, cars: [] };
    case CAR_LIST_SUCCESS:
      return {
        loading: false,
        cars: action.payload.cars,
      };
    case CAR_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const carDetailsReducer = (state = { car: {} }, action) => {
  switch (action.type) {
    case CAR_DETAILS_REQUEST:
      return { ...state, loading: true };
    case CAR_DETAILS_SUCCESS:
      return { loading: false, car: action.payload };
    case CAR_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    case CAR_DETAILS_RESET:
      return {};
    default:
      return state;
  }
};

export const carDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case CAR_DELETE_REQUEST:
      return { loading: true };
    case CAR_DELETE_SUCCESS:
      return { loading: false, success: true };
    case CAR_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const carCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case CAR_CREATE_REQUEST:
      return { loading: true };
    case CAR_CREATE_SUCCESS:
      return { loading: false, success: true, car: action.payload };
    case CAR_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case CAR_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

export const carUpdateReducer = (state = { car: {} }, action) => {
  switch (action.type) {
    case CAR_UPDATE_REQUEST:
      return { loading: true };
    case CAR_UPDATE_SUCCESS:
      return { loading: false, success: true, car: action.payload };
    case CAR_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case CAR_UPDATE_RESET:
      return { car: {} };
    default:
      return state;
  }
};

export const carReservationReducer = (state = {}, action) => {
  switch (action.type) {
    case CAR_RESERVATION_REQUEST:
      return { loading: true };
    case CAR_RESERVATION_SUCCESS:
      return { loading: false, success: true, dates: action.payload };
    case CAR_RESERVATION_FAIL:
      return { loading: false, error: action.payload };
    case CAR_RESERVATION_RESET:
      return {};
    default:
      return state;
  }
};
