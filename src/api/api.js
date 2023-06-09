import axios from "axios";

const apiURLs = {
  development: "https://fair-share-k-backend.cyclic.app",
  production: "https://fair-share-k-backend.cyclic.app",
};

const api = axios.create({ baseURL: apiURLs[process.env.NODE_ENV] });

api.interceptors.request.use((config) => {
  const loggedInUserJSON = localStorage.getItem("loggedInUser");
  const parseLoggedInUser = JSON.parse(loggedInUserJSON || '""');
  if (parseLoggedInUser.token) {
    config.headers = { Authorization: `Bearer ${parseLoggedInUser.token}` };
  }
  return config;
});

export { api };
