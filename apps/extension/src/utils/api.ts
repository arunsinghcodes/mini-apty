import { getToken } from "../storage/auth";

export async function apiFetch(
  url: string,
  options: RequestInit = {}
) {
  const token = await getToken();

  return fetch(url, {
    ...options,

    headers: {
      ...(options.headers || {}),

      Authorization: `Bearer ${token}`,

      "Content-Type": "application/json",
    },
  });
}