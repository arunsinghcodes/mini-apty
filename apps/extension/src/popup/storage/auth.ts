export async function saveToken(token: string) {
  await chrome.storage.local.set({
    token,
  });
}

export async function getToken() {
  const { token } = await chrome.storage.local.get("token");

  return token ?? null;
}

export async function removeToken() {
  await chrome.storage.local.remove("token");
}
