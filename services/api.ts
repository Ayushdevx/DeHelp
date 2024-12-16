import axios from "axios";

const API = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000",
});

export const fetchData = async () => {
  const response = await API.get("/");
  return response.data;
};
