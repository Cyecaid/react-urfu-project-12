import { request } from "./client.js";

export const login = (values) => request("/login", { method: "POST", body: values });

export const signup = (values) => request("/signup", { method: "POST", body: values });
