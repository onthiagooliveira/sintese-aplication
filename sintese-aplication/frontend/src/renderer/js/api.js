const API_BASE = window.SINTESE_API_BASE ?? "http://localhost:8000/api/v1";

async function post(path, body) {
  return fetch(API_BASE + path, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(body),
  });
}

export const register = (data) => post("/auth/register", data);
export const login = (data) => post("/auth/login", data);

export function startGoogleLogin() {
  window.location.href = `${API_BASE}/auth/google/start`;
}