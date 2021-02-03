import axios from "axios";
import { Toast } from "antd-mobile";

axios.interceptors.request.use(function (config) {
  Toast.loading("加载中", 0);
  return config;
});
axios.interceptors.response.use(function (data) {
  setTimeout(() => {
    Toast.hide();
  }, 1000);
  return data;
});

export const getData = () => {
  return axios("/data");
};
