import React from "react";
import { useLocation } from "react-router";

const Footer = () => {
  const location = useLocation();
  if (location.pathname !== "/") {
    return (
      <footer className="mt-auto">
        <div className="text-center my-3">Copyright &copy; CAR RENTAL</div>
      </footer>
    );
  } else return null;
};

export default Footer;
