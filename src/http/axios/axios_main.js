import axios from "axios";

const axiosMain = axios.create({
  baseURL: "https://solanagods.com:3000/",
  headers: {
    "Content-Type": "application/json",
  },
});
export default axiosMain;
