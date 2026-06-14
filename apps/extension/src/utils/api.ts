import { getToken } from "../storage/auth";

const BASE_URL = import.meta.env.VITE_API_URL ?? "http://localhost:4000";

export async function apiFetch(url: string, options: RequestInit = {}) {
  const token = await getToken();

  const headers = new Headers(options.headers);

  headers.set("Content-Type", "application/json");

  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  const response = await fetch(`${BASE_URL}${url}`, {
    ...options,
    headers,
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result?.message || result?.error || "Something went wrong");
  }

  return result;
}