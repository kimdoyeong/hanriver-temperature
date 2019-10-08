import axios from "axios";

const baseURL = process.env.REACT_APP_SERVER || "http://localhost:3001";

const client = axios.create({
  baseURL
});

export default client;
