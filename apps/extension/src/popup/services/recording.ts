export async function startRecording() {
  const [tab] = await chrome.tabs.query({
    active: true,
    currentWindow: true,
  });

  if (!tab?.id) {
    throw new Error("No active tab found");
  }

  await chrome.tabs.sendMessage(tab.id, {
    type: "START_RECORDING",
  });
}

export async function stopRecording() {
  const [tab] = await chrome.tabs.query({
    active: true,
    currentWindow: true,
  });

  if (!tab?.id) {
    throw new Error("No active tab found");
  }

  await chrome.tabs.sendMessage(tab.id, {
    type: "STOP_RECORDING",
  });
}