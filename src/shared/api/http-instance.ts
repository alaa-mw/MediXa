import axios from "axios";
import { setupAuthInterceptors } from "./auth-interceptors";


export const baseUrl =  "http://127.0.0.1:3000";

const http = axios.create({
  baseURL: "/api",
  headers: {
    "Content-Type": "application/json",
  },
});

setupAuthInterceptors(http);

export default http;
