import axios from "axios";

import {
  LOGIN_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT_USER_FAILURE,
  LOGOUT_USER_REQUEST,
  LOGOUT_USER_SUCCESS,
  REGISTER_USER_FAILURE,
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
} from "../actionTypes/authTypes";
import { baseUrl } from "../../api/api";

export const registerAction = (formData) => async (dispatch) => {
  try {
    dispatch({
      type: REGISTER_USER_REQUEST,
    });

    const { data } = await axios.post(
      `${baseUrl}/api/users/create-user`,
      formData
    );

    const { token, user } = data;
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));

    dispatch({
      type: REGISTER_USER_SUCCESS,
      payload: data || {},
    });
  } catch (error) {
    dispatch({
      type: REGISTER_USER_FAILURE,
      payload: error.response.data.message,
    });
  }
};

export const loginAction = ({ email, password }) => async (dispatch) => {
  try {
    dispatch({
      type: LOGIN_REQUEST,
    });

    const { data } = await axios.post(
      `${baseUrl}/api/users/login`,
      { email, password }
    );

    const { token, user } = data;
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));

    dispatch({
      type: LOGIN_SUCCESS,
      payload: data || {},
    });
  } catch (error) {
    dispatch({
      type: LOGIN_FAILURE,
      payload: error.response.data.message
    });
  }
};

export const isUserLoggedIn = () => async (dispatch) => {
  const token = localStorage.getItem("token");
  if (token) {
    const user = JSON.parse(localStorage.getItem("user"));
    dispatch({
      type: LOGIN_SUCCESS,
      payload: {
        token,
        user,
      },
    });
  }
};

export const logoutAction = () => (dispatch) => {
  try {
    dispatch({
      type: LOGOUT_USER_REQUEST
    })

    localStorage.clear();
    sessionStorage.clear();

    dispatch({
      type: LOGOUT_USER_SUCCESS,
    })

  } catch (error) {
    dispatch({
      type: LOGOUT_USER_FAILURE,
      payload: error.response.data.message
    })
  }
}