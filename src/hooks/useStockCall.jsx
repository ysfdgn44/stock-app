import axios from "axios";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchFail,
  fetchStart,
  getSuccess,
  getProCatBrandSuccess,
} from "../features/stockSlice";
import { toastErrorNotify, toastSuccessNotify } from "../helper/ToastNotify";
import useAxios from "./useAxios";

const useStockCall = () => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const { axiosWithToken } = useAxios();
  const getStockData = async (url) => {
    // const BASE_URL = "https://11195.fullstack.clarusway.com/";
    dispatch(fetchStart());

    try {
      //   const { data } = await axios(`${BASE_URL}stock/${url}/`, {
      //     headers: { Authorization: `Token ${token}` },
      //   });
      const { data } = await axiosWithToken(`stock/${url}/`);
      dispatch(getSuccess({ data, url }));
    } catch (error) {
      console.log(error);
      dispatch(fetchFail());
    }
  };
  const deleteStockData = async (url, id) => {
    // const BASE_URL = "https://11195.fullstack.clarusway.com/";
    dispatch(fetchStart());

    try {
      await axiosWithToken.delete(`stock/${url}/${id}/`);
      toastSuccessNotify(`${url} successfuly deleted `);
      getStockData(url);
    } catch (error) {
      console.log(error);
      dispatch(fetchFail());
      toastErrorNotify(`${url} can not  delete `);
    }
  };
  const postStockData = async (url, info) => {
    // const BASE_URL = "https://11195.fullstack.clarusway.com/";
    dispatch(fetchStart());

    try {
      await axiosWithToken.post(`stock/${url}/`, info);
      toastSuccessNotify(`${url} successfuly posted `);
      getStockData(url);
    } catch (error) {
      console.log(error);
      dispatch(fetchFail());
      toastErrorNotify(`${url} can not  posted `);
    }
  };
  const putStockData = async (url, info) => {
    dispatch(fetchStart());

    try {
      await axiosWithToken.put(`stock/${url}/${info.id}/`, info);
      toastSuccessNotify(`${url} successfuly updated `);
      getStockData(url);
    } catch (error) {
      console.log(error);
      dispatch(fetchFail());
      toastErrorNotify(`${url} can not  updated `);
    }
  };
  const getProCatBrand = async () => {
    dispatch(fetchStart());

    try {
      const [products, categories, brands] = await Promise.all([
        axiosWithToken.get("stock/products/"),
        axiosWithToken.get("stock/categories/"),
        axiosWithToken.get("stock/brands/"),
      ]);
      dispatch(
        getProCatBrandSuccess([products?.data, categories?.data, brands?.data])
      );
    } catch (error) {
      console.log(error);
      dispatch(fetchFail());
      toastErrorNotify(`data can not bemfetched `);
    }
  };
  return {
    getStockData,
    deleteStockData,
    getProCatBrand,
    postStockData,
    putStockData,
  };
};

export default useStockCall;
