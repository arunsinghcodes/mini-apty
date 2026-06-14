import { captureElement } from "./recorder/captureElement";
import { getBestElement } from "../utils/getBestElement";
import type { ElementTarget } from "@mini-apty/shared";
import {
  getWalkthrough,
  getWalkthroughs,
  saveWalkthrough,
} from "../api/walkthroughApi";
import { playWalkthrough } from "./player/playWalkthrough";
// @ts-ignore: Enable side-effect CSS import in TypeScript
import "./overlay/styles.css";
import { WalkthroughPlayer } from "./player/walkthroughPlayer";
import { saveToken } from "../storage/auth";

console.log("🚀 Mini Apty Content Script Loaded");

let recording = false;

const recorder = {
  title: `Walkthrough-${new Date().toISOString()}`,
  origin: window.location.origin,
  pathPattern: window.location.pathname,
  steps: [] as ElementTarget[],
};

document.addEventListener(
  "click",
  (event) => {
    if (!recording) return;
    const element = event.target as HTMLElement;
    // Ignore extension UI
    if (element.closest("#mini-apty-overlay")) return;
    const target = getBestElement(element);
    if (!target) return;
    recorder.steps.push(captureElement(target));
    console.clear();
    console.table(recorder.steps);
  },
  true,
);

async function saveCurrentWalkthrough() {
  try {
    const result = await saveWalkthrough({
      title: recorder.title,
      origin: recorder.origin,
      pathPattern: recorder.pathPattern,
      steps: recorder.steps,
    });

    console.log("Hllo", {
      title: recorder.title,
      origin: recorder.origin,
      pathPattern: recorder.pathPattern,
      steps: recorder.steps,
    });

    console.log("✅ Walkthrough Saved");

    console.log(result);

    recorder.steps.length = 0;
  } catch (error) {
    console.error(error);
  }
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "START_RECORDING") {
    recording = true;

    console.log("🎥 Recording Started");

    sendResponse({
      success: true,
    });
  }

  if (message.type === "STOP_RECORDING") {
    recording = false;

    console.log("🛑 Recording Stopped");

    saveCurrentWalkthrough();

    sendResponse({
      success: true,
    });
  }

  return true;
});

chrome.runtime.onMessage.addListener(async (message) => {
  if (message.type === "PLAY_WALKTHROUGH") {
    console.log("Received PLAY message:", message);

    try {
      const walkthrough = await getWalkthrough(message.walkthroughId);

      console.log("Walkthrough:", walkthrough);

      const player = new WalkthroughPlayer(walkthrough);

      player.start();

      document
        .getElementById("mini-apty-next")
        ?.addEventListener("click", () => player.next());

      document
        .getElementById("mini-apty-prev")
        ?.addEventListener("click", () => player.previous());

      document
        .getElementById("mini-apty-close")
        ?.addEventListener("click", () => player.close());
    } catch (err) {
      console.error("Play failed:", err);
    }
  }
});
