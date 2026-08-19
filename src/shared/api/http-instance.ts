import axios from "axios";
import { setupAuthInterceptors } from "./auth-interceptors";

// export const baseUrl = "http://127.0.0.1:4000";
// export const baseUrl = `${import.meta.env.VITE_API_URL}`;
//  "https://api.medixa.software";

const http = axios.create({
  baseURL: "/api",
  headers: {
    "Content-Type": "application/json",
  },
});

setupAuthInterceptors(http);

export default http;
