const BASE_URL = "http://localhost:8080";

export async function login(payload: { email: string; password: string }) {
  const response = await fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const error = await response.json();

    throw new Error(error.message);
  }

  const result = await response.json();

  return result.data;
}

export async function signup(payload: {
  name: string;
  email: string;
  password: string;
}) {
  const response = await fetch(`${BASE_URL}/auth/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error("Signup failed");
  }

  const result = await response.json();

  return result.data;
}
