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