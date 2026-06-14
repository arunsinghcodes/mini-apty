import { apiFetch } from "../../utils/api";

export async function login(payload: { email: string; password: string }) {
  const result = await apiFetch("/auth/login", {
    method: "POST",
    body: JSON.stringify(payload),
  });

  return result.data;
}

export async function signup(payload: {
  name: string;
  email: string;
  password: string;
}) {
  const result = await apiFetch("/auth/signup", {
    method: "POST",
    body: JSON.stringify(payload),
  });

  return result.data;
}
