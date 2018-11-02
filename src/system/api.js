import axios from "axios";
import {authService} from "../services";
import {alerts} from "../services";
import dispatch from "./store";

export const authHeader = () => {
  const token = localStorage.getItem("token");
  if (token) {
    return {Authorization: "Bearer " + token};
  }
  return {};
};

export const api = () => {
  return axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: authHeader(),
    responseType: "json",
    validateStatus: status => {
      return status < 400;
    },
    transformResponse: [
      response => {
        if (response.staus && response.staus === 401) {
          dispatch(
            alerts.actions.bad("Looks like you're no longer logged in", {
              toastId: "@app/api/general/unauthorised"
            })
          );
          dispatch(authService.logout());
        }
        return response;
      }
    ]
  });
};

export default api;
