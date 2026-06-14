import { saveWalkthroughCache } from "../storage/cache";
import { apiFetch } from "../utils/api";

const BASE_URL = "http://localhost:8080";

export async function saveWalkthrough(payload: any) {
  const response = await apiFetch(`${BASE_URL}/walkthroughs`, {
    method: "POST",
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error("Failed to save walkthrough");
  }

  const result = await response.json();

  await saveWalkthroughCache(
    result.data.origin,
    result.data.pathPattern,
    result.data,
  );

  return result.data;
}

export async function getWalkthrough(id: string) {
  const response = await apiFetch(`${BASE_URL}/walkthroughs/${id}`);

  if (!response.ok) {
    throw new Error("Failed to fetch walkthrough");
  }

  const result = await response.json();

  await saveWalkthroughCache(
    result.data.origin,
    result.data.pathPattern,
    result.data,
  );

  return result.data;
}

export async function getWalkthroughs() {
  const response = await apiFetch(
    `${BASE_URL}/walkthroughs?origin=${encodeURIComponent(
      window.location.origin,
    )}`,
  );

  if (!response.ok) {
    throw new Error("Failed to fetch walkthroughs");
  }

  const result = await response.json();

  return result.data;
}