/* eslint-disable no-undef */
import axios from "axios";

const api = axios.create({
  baseURL:
    import.meta.VITE_DEVELOPMENT === "development"
      ? "http://localhost:3000/v1/api/"
      : "https://sociobyte.vercel.app/v1/api/",
});

export default api;
