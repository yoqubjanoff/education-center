import axios from "axios";

const request = axios.create({
  baseURL: "http://192.168.0.21:8080/api",
  headers: {
    common: {
      Authorization: "Basic " + localStorage.getItem("token"),
    },
  },
});

request.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    config.headers["Authorization"] = `Bearer ${token}`;

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

request.interceptors.response.use(
  (response) => {
    return response;
  },
  (err) => {
    console.log(err);
    return Promise.reject(err);
  }
);

export default request;
