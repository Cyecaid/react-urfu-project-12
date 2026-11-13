const REQUEST_TIMEOUT = 10000;

export class HttpError extends Error {
  constructor(status) {
    super(`HTTP ${status}`);
    this.status = status;
  }
}

export const createRequest = (authStore) => async (path, { method = "GET", body } = {}) => {
  const { token, logOut } = authStore.getState();

  const response = await fetch(`/api/v1${path}`, {
    method,
    headers: {
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(body ? { "Content-Type": "application/json" } : {}),
    },
    ...(body ? { body: JSON.stringify(body) } : {}),
    signal: AbortSignal.timeout(REQUEST_TIMEOUT),
  });

  if (!response.ok) {
    if (response.status === 401 && token) {
      logOut();
    }
    throw new HttpError(response.status);
  }

  return response.json();
};
