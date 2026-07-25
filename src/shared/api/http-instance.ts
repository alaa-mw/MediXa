import axios from "axios";
import { setupAuthInterceptors } from "./auth-interceptors";

// export const baseUrl = "http://127.0.0.1:3000";
export const baseUrl = "https://f8db-37-19-221-225.ngrok-free.app";


const http = axios.create({
  baseURL: "/api",
  headers: {
    "Content-Type": "application/json",
  },
});

setupAuthInterceptors(http);

export default http;
