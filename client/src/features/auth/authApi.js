import axios from "axios";

const signup = async (userData) => {
  // userData is an object with username and password
  const response = await axios.post("/api/users/signup", userData); // POST request to server
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data)); // Save user data to local storage
  }
  return response.data;
};

const signin = async (userData) => {
  // userData is an object with username and password
  const response = await axios.post("/api/users/signin", userData); // POST request to server
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data)); // Save user data to local storage
  }
  return response.data;
};

const signout = () => {
  localStorage.removeItem("user"); // Remove user data from local storage
};

const authApi = {
  signup,
  signin,
  signout,
};

export default authApi;
