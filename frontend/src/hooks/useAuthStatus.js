import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

export const useAuthStatus = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [checkingStatus, setCheckingStatus] = useState(true);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (userInfo) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
    setCheckingStatus(false);
  }, [userInfo]);

  return { loggedIn, checkingStatus };
};

export const useAdminAuthStatus = () => {
  const [adminLoggedIn, setAdminLoggedIn] = useState(false);
  const [adminCheckingStatus, setAdminCheckingStatus] = useState(true);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (userInfo.isAdmin) {
      setAdminLoggedIn(true);
    } else {
      setAdminLoggedIn(false);
    }
    setAdminCheckingStatus(false);
  }, [userInfo.isAdmin]);

  return { adminLoggedIn, adminCheckingStatus };
};
