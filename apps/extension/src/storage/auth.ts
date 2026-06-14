export async function saveToken(token: string) {
  await chrome.storage.local.set({
    token,
  });
}

export async function getToken() {
  const result = await chrome.storage.local.get("token");

  return result.token;
}

export async function removeToken() {
  await chrome.storage.local.remove("token");
}