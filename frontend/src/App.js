import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomeScreen from "./screens/HomeScreen";
import ContactScreen from "./screens/ContactScreen";
import ConfirmMessage from "./screens/ConfirmMessage";
import CarsScreen from "./screens/CarsScreen";
import CarScreen from "./screens/CarScreen";
import LoginScreen from "./screens/LoginScreen";
import ProfileScreen from "./screens/ProfileScreen";
import RegisterScreen from "./screens/RegisterScreen";
import CartScreen from "./screens/CartScreen";
import PaymentScreen from "./screens/PaymentScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import OrderScreen from "./screens/OrderScreen";
import CarListScreen from "./screens/CarListScreen";
import UserListScreen from "./screens/UserListScreen";
import OrderListScreen from "./screens/OrderListScreen";
import UserEditScreen from "./screens/UserEditScreen";
import CarEditScreen from "./screens/CarEditScreen";
import { PrivateRoute, AdminPrivateRoute } from "./components/PrivateRoute";

function App() {
  return (
    <div className="App d-flex flex-column min-vh-100">
      <Header />
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/contact" element={<ContactScreen />} />
        <Route path="/cars" element={<CarsScreen />} />
        <Route path="/cars/search/:keyword" element={<CarsScreen />} />
        <Route path="/cars/:id" element={<CarScreen />} />
        <Route path="/contact/confirm-message" element={<ConfirmMessage />} />
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/register" element={<RegisterScreen />} />
        <Route path="/profile" element={<PrivateRoute />}>
          <Route path="/profile" element={<ProfileScreen />} />
        </Route>
        <Route path="/cart" element={<PrivateRoute />}>
          <Route path="/cart/" element={<CartScreen />} />
          <Route path="/cart/:id" element={<CartScreen />} />
        </Route>
        <Route path="/payment" element={<PrivateRoute />}>
          <Route path="/payment" element={<PaymentScreen />} />
        </Route>
        <Route path="/placeorder" element={<PrivateRoute />}>
          <Route path="/placeorder" element={<PlaceOrderScreen />} />
        </Route>
        <Route path="/order/:id" element={<PrivateRoute />}>
          <Route path="/order/:id" element={<OrderScreen />} />
        </Route>
        <Route path="/admin/carlist" element={<AdminPrivateRoute />}>
          <Route path="/admin/carlist" element={<CarListScreen />} />
        </Route>
        <Route path="/admin/car/:id/edit" element={<AdminPrivateRoute />}>
          <Route path="/admin/car/:id/edit" element={<CarEditScreen />} />
        </Route>
        <Route path="/admin/userlist" element={<AdminPrivateRoute />}>
          <Route path="/admin/userlist" element={<UserListScreen />} />
        </Route>
        <Route path="/admin/user/:id/edit" element={<AdminPrivateRoute />}>
          <Route path="/admin/user/:id/edit" element={<UserEditScreen />} />
        </Route>
        <Route path="/admin/orderlist" element={<AdminPrivateRoute />}>
          <Route path="/admin/orderlist" element={<OrderListScreen />} />
        </Route>
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
