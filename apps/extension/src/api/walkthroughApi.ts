const BASE_URL = "http://localhost:8080";

export async function saveWalkthrough(payload: any) {
  const response = await fetch(`${BASE_URL}/walkthroughs`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      // Later
      // Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error("Failed to save walkthrough");
  }

  return response.json();
}

export async function getWalkthrough(id: string) {
  const response = await fetch(`${BASE_URL}/walkthroughs/${id}`);

  if (!response.ok) {
    throw new Error("Failed to fetch walkthrough");
  }

  const result = await response.json();

  return result.data;
}

export async function getWalkthroughs() {
  const response = await fetch(
    `${BASE_URL}/walkthroughs?origin=${encodeURIComponent(
      window.location.origin
    )}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch walkthroughs");
  }

  const result = await response.json();

  return result.data;
}