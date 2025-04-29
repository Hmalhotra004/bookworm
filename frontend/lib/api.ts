import axios from "axios";

const BASE_URL =
  process.env.NODE_ENV === "production"
    ? "http://localhost:3000/api"
    : "https://bookworm-kes2.onrender.com/api";

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
