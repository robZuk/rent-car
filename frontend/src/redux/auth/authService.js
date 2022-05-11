import axios from "axios";

//

// Register user
const register = async (userData) => {
  const response = await axios.post("/api/users/", userData);

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};

// Login user
const login = async (userData) => {
  const response = await axios.post("/api/users/login", userData);

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};

// Logout user
const logout = () => localStorage.removeItem("user");

//User Deytails

const getUserDetails = async (user) => {
  const config = {
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  };
  const response = await axios.get(`/api/users/profile`, config);
  return response.data;
};

const authService = {
  register,
  logout,
  login,
  getUserDetails,
};

export default authService;
