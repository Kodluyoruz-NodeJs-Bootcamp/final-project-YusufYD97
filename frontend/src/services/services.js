import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "https://movies-api-yd.herokuapp.com";

const register = (firstName: string, lastName: string, email: string, password: string) => {
  return axios.post(API_URL + "/users", {
    firstName,
    lastName,
    email,
    password,
  });
};

const login = (email: string, password: string) => {
  return axios
    .post(API_URL + "/users/login", {
      email,
      password,
    })
    .then((response) => {
      if (response.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }

      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem("user");
};

const getMovies = () => {
  return axios.get(API_URL + "/movies");
};

export default {
  register,
  login,
  logout,
  getMovies
};
