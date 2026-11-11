import { request } from "./client.js";

export const login = (values) => request("/login", { method: "POST", body: values });
