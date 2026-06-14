export async function saveWalkthroughCache(
  origin: string,
  pathPattern: string,
  walkthrough: any,
) {
  const key = `walkthrough:${origin}:${pathPattern}`;

  await chrome.storage.local.set({
    [key]: walkthrough,
  });
}

export async function getWalkthroughCache(
  origin: string,
  pathPattern: string,
) {
  const key = `walkthrough:${origin}:${pathPattern}`;

  const result = await chrome.storage.local.get(key);

  return result[key] || null;
}