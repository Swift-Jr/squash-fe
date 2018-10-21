import axios from "axios";
import {authService} from "../services";
import {alerts} from "../services";
import dispatch from "./store";

export const authHeader = () => {
  let token = localStorage.getItem("token");
  if (token) {
    return {Authorization: "Bearer " + token};
  } else {
    return {};
  }
};

export const api = () => {
  return axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: authHeader(),
    transformResponse: [
      response => {
        if (response.staus == 401) {
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