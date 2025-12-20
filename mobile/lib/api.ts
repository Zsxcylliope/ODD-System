import axios from "axios";

const baseURL = process.env.EXPO_PUBLIC_API_URL;

if (!baseURL) {
  throw new Error("EXPO_PUBLIC_API_URL is NOT defined");
}

const api = axios.create({
  baseURL,
  timeout: 10000,
});

export default api;