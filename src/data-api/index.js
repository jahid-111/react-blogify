import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.SERVER_URL,
});

export { api };
