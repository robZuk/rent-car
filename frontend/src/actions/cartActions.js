import axios from "axios";
import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_SAVE_PAYMENT_METHOD,
} from "../constants/cartConstants";

export const addToCart = (id, reservedDays) => async (dispatch, getState) => {
  const { data } = await axios.get(`/api/cars/${id}`);

  dispatch({
    type: CART_ADD_ITEM,
    payload: {
      car: data._id,
      name: data.name,
      image: data.image,
      price: data.price,
      reservedDays,
    },
  });

  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const removeFromCart = (id) => (dispatch, getState) => {
  dispatch({
    type: CART_REMOVE_ITEM,
    payload: id,
  });

  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const savePaymentOnAccountMethod = (data) => (dispatch) => {
  dispatch({
    type: CART_SAVE_PAYMENT_METHOD,
    payload: data,
  });

  localStorage.setItem("paymentOnAccountMethod", JSON.stringify(data));
};
