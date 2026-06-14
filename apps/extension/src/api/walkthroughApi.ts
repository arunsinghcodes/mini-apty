import { saveWalkthroughCache } from "../storage/cache";
import { apiFetch } from "../utils/api";

export async function saveWalkthrough(payload: any) {
  const result = await apiFetch("/walkthroughs", {
    method: "POST",
    body: JSON.stringify(payload),
  });

  await saveWalkthroughCache(
    result.data.origin,
    result.data.pathPattern,
    result.data,
  );

  return result.data;
}

export async function getWalkthrough(id: string) {
  const result = await apiFetch(`/walkthroughs/${id}`);

  await saveWalkthroughCache(
    result.data.origin,
    result.data.pathPattern,
    result.data,
  );

  return result.data;
}

export async function getWalkthroughs() {
  const [tab] = await chrome.tabs.query({
    active: true,
    currentWindow: true,
  });

  if (!tab.url) {
    return [];
  }

  const origin = new URL(tab.url).origin;

  const result = await apiFetch(
    `/walkthroughs?origin=${encodeURIComponent(origin)}`,
  );

  return result.data;
}

export async function deleteWalkthrough(id: string) {
  return apiFetch(`/walkthroughs/${id}`, {
    method: "DELETE",
  });
}
