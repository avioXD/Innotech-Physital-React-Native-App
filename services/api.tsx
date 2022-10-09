import axios from "axios";
import jwt_decode from "jwt-decode";
const base_url = "https://innoteach-api.herokuapp.com";
export const loginUser = async (user: any) => {
  return axios.post(base_url + "/api/v1/user/login", {
    phone: user.email,
    password: user.password,
  });
};
export const registerUser = async (user: any) => {
  //console.log("foreegister", user);
  return axios.post(base_url + "/api/v1/user/signup", user);
};

export const updateUser = async (user: any) => {
  try {
    return axios.patch(base_url + "/api/v1/user/" + user._id, user);
  } catch (e) {}
};

export const getUserById = async (id: any) => {
  return axios.get(base_url + "/api/v1/user/stats/" + id);
};
