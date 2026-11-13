export const login = (request, values) => request("/login", { method: "POST", body: values });

export const signup = (request, values) => request("/signup", { method: "POST", body: values });
