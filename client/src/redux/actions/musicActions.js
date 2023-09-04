import axios from "axios";
import { baseUrl } from "../../api/api";
import {
  DELETE_MUSIC_FAILURE,
  DELETE_MUSIC_REQUEST,
  DELETE_MUSIC_SUCCESS,
  EDIT_MUSIC_FAILURE,
  EDIT_MUSIC_REQUEST,
  EDIT_MUSIC_SUCCESS,
  GET_MUSIC_BY_ID_FAILURE,
  GET_MUSIC_BY_ID_REQUEST,
  GET_MUSIC_BY_ID_SUCCESS,
  GET_MUSIC_FAILURE,
  GET_MUSIC_REQUEST,
  GET_MUSIC_SUCCESS,
  UPLOAD_MUSIC_FAILURE,
  UPLOAD_MUSIC_REQUEST,
  UPLOAD_MUSIC_SUCCESS,
} from "../actionTypes/musicTypes";

export const fetchMusic =
  ({ search, genre, page }) =>
    async (dispatch, getState) => {
      try {
        dispatch({
          type: GET_MUSIC_REQUEST,
        });

        const token = getState().auth.token;

        const { data } = await axios.get(
          `${baseUrl}/api/music/user-music?search=${search}&genre=${genre}&page=${page}`,
          {
            headers: {
              "x-auth-token": token,
            },
          }
        );

        dispatch({
          type: GET_MUSIC_SUCCESS,
          payload: data || {},
        });
      } catch (error) {
        dispatch({
          type: GET_MUSIC_FAILURE,
          payload: error.response.data.message,
        });
      }
    };

export const uploadMusic = (formData) => async (dispatch, getState) => {
  try {
    dispatch({
      type: UPLOAD_MUSIC_REQUEST,
    });

    const token = getState().auth.token;

    const { data } = await axios.post(`${baseUrl}/api/music/upload`, formData, {
      headers: {
        "x-auth-token": token,
      },
    });

    dispatch({
      type: UPLOAD_MUSIC_SUCCESS,
      payload: data || {},
    });
  } catch (error) {
    dispatch({
      type: UPLOAD_MUSIC_FAILURE,
      payload: error.response.data.message,
    });
  }
};

export const editMusic = (id, formData) => async (dispatch, getState) => {
  try {
    dispatch({
      type: EDIT_MUSIC_REQUEST,
    });

    const token = getState().auth.token;

    const { data } = await axios.put(
      `${baseUrl}/api/music/edit/${id}`,
      formData,
      {
        headers: {
          "x-auth-token": token,
        },
      }
    );

    dispatch({
      type: EDIT_MUSIC_SUCCESS,
      payload: data || {},
    });
  } catch (error) {
    dispatch({
      type: EDIT_MUSIC_FAILURE,
      payload: error.response.data.message,
    });
  }
};

export const fetchMusicbyId = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: GET_MUSIC_BY_ID_REQUEST,
    });

    const token = getState().auth.token;

    const { data } = await axios.get(`${baseUrl}/api/music/${id}`, {
      headers: {
        "x-auth-token": token,
      },
    });

    dispatch({
      type: GET_MUSIC_BY_ID_SUCCESS,
      payload: data || {},
    });
  } catch (error) {
    dispatch({
      type: GET_MUSIC_BY_ID_FAILURE,
      payload: error.response.data.message,
    });
  }
};

export const delteMusicFile = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: DELETE_MUSIC_REQUEST,
    });

    const token = getState().auth.token;

    const { data } = await axios.delete(`${baseUrl}/api/music/delete/${id}`, {
      headers: {
        "x-auth-token": token,
      },
    });

    dispatch({
      type: DELETE_MUSIC_SUCCESS,
      payload: data || {},
    });
  } catch (error) {
    dispatch({
      type: DELETE_MUSIC_FAILURE,
      payload: error.response.data.message,
    });
  }
};
