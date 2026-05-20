import axios from "axios";
import { setupAuthInterceptors } from "./auth-interceptors";

const http = axios.create({
  baseURL: "/api",
  headers: {
    "Content-Type": "application/json",
  },
});

setupAuthInterceptors(http);

export default http;
