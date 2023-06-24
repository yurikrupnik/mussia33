import axios from "axios";

const instance = axios.create({
  baseURL: import.meta.env.VITE_HOST || "",
});

export default instance;

const s = import.meta.env.VITE_APP_ENV || "default";

console.log("s", s);
console.log("vite_host", import.meta.env.VITE_HOST);
console.log("shit", import.meta.env.VITE_SHIT);
console.log("MODE", import.meta.env.MODE);
console.log("DEV", import.meta.env.DEV);
console.log("PROD", import.meta.env.PROD);
