import { captureElement } from "./recorder/captureElement";
import { getBestElement } from "../utils/getBestElement";
import type { ElementTarget } from "@mini-apty/shared";
import { getWalkthrough, saveWalkthrough } from "../api/walkthroughApi";
// @ts-ignore: Enable side-effect CSS import in TypeScript
import "./overlay/styles.css";
import { WalkthroughPlayer } from "./player/walkthroughPlayer";

console.log("🚀 Mini Apty Content Script Loaded, Hello");

let recording = false;

const recorder = {
  title: `Walkthrough-${new Date().toISOString()}`,
  origin: window.location.origin,
  pathPattern: window.location.pathname,
  steps: [] as ElementTarget[],
};

// ─── Click capture during recording ──────────────────────────────────────────
document.addEventListener(
  "click",
  (event) => {
    if (!recording) return;
    const element = event.target as HTMLElement;
    if (element.closest("#mini-apty-overlay")) return;
    const target = getBestElement(element);
    if (!target) return;
    recorder.steps.push(captureElement(target));
    console.log(`✅ Step captured (${recorder.steps.length} total)`);
  },
  true,
);

// ─── Save walkthrough to backend ──────────────────────────────────────────────
async function saveCurrentWalkthrough() {
  if (recorder.steps.length === 0) {
    console.warn("⚠️ No steps to save");
    return;
  }
  try {
    await saveWalkthrough({
      title: recorder.title,
      origin: recorder.origin,
      pathPattern: recorder.pathPattern,
      steps: recorder.steps,
    });
    console.log("✅ Walkthrough Saved");
    recorder.steps.length = 0;
  } catch (error) {
    console.error("❌ Failed to save walkthrough:", error);
  }
}

// ─── Message listener ─────────────────────────────────────────────────────────
chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
  if (message.type === "START_RECORDING") {
    recording = true;
    recorder.title = `Walkthrough-${new Date().toISOString()}`;
    recorder.steps = [];
    console.log("🎥 Recording Started");
    sendResponse({ success: true });
  }

  if (message.type === "STOP_RECORDING") {
    recording = false;
    console.log("🛑 Recording Stopped");
    saveCurrentWalkthrough();
    sendResponse({ success: true });
  }

  if (message.type === "PLAY_WALKTHROUGH") {
    getWalkthrough(message.walkthroughId)
      .then((walkthrough) => {
        // ✅ Buttons are wired inside player.start() — no duplicate listeners
        const player = new WalkthroughPlayer(walkthrough);
        player.start();
      })
      .catch((err) => console.error("❌ Play failed:", err));
  }

  return true;
});
