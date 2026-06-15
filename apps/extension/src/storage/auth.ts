export async function saveToken(token: string) {
  // console.log("Saving token:", token);

  await chrome.storage.local.set({
    token,
  });

  const result = await chrome.storage.local.get(null);

  // console.log("Storage after save:", result);
}

export async function getToken() {
  const result = await chrome.storage.local.get(null);

  // console.log("Storage while reading:", result);

  return result.token ?? null;
}

export async function removeToken() {
  await chrome.storage.local.remove("token");
}