import React from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import {
  fetchFail,
  fetchStart,
  loginSuccess,
  logoutSuccess,
  registerSuccess,
} from "../features/authSlice";
import { useNavigate } from "react-router-dom";
const useAuthCall = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const BASE_URL = "https://11195.fullstack.clarusway.com/";
  const login = async (userInfo) => {
    dispatch(fetchStart());
    try {
      const { data } = await axios.post(
        `${BASE_URL}account/auth/login/`,
        userInfo
      );

      dispatch(loginSuccess(data));
      navigate("/stock");
      return data;
    } catch (error) {
      console.log(error);
      dispatch(fetchFail());
    }
  };

  const register = async (userInfo) => {
    const BASE_URL = "https://11195.fullstack.clarusway.com/";
    dispatch(fetchStart());
    try {
      const { data } = await axios.post(
        `${BASE_URL}account/register/`,
        userInfo
      );

      dispatch(registerSuccess(data));
      navigate("/stock");
      return data;
    } catch (error) {
      console.log(error);
      dispatch(fetchFail());
    }
  };
  const logout = async (userInfo) => {
    const BASE_URL = "https://11195.fullstack.clarusway.com/";
    dispatch(fetchStart());
    try {
      const { data } = await axios.post(
        `${BASE_URL}account/auth/logout/`,
        userInfo
      );

      dispatch(logoutSuccess());
      navigate("/");
      return data;
    } catch (error) {
      console.log(error);
      dispatch(fetchFail());
    }
  };
  return { register, login, logout };
};

export default useAuthCall;
