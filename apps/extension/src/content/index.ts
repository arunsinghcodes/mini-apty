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

console.log("🚀 Content Script Loaded");

let recording = true;

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

window.addEventListener("keydown", (event) => {
  if (event.key === "F9") {
    console.log({
      title: recorder.title,
      steps: recorder.steps,
    });
    saveCurrentWalkthrough();
  }
});

window.addEventListener("keydown", async (event) => {
  if (event.key !== "F10") return;

  const walkthroughs = await getWalkthroughs();

  if (walkthroughs.length === 0) {
    console.log("No walkthrough found");
    return;
  }

  // Play the first matching walkthrough
  const walkthrough = await getWalkthrough(walkthroughs[0]._id);

  console.log(walkthrough);

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
});

window.addEventListener("keydown", async (event) => {
  if (event.key === "F8") {
    await saveToken(
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2YTJlOTQ3NTI4NmE2YmFiNjE4MGZhNjciLCJpYXQiOjE3ODE0Mzc1ODIsImV4cCI6MTc4MjA0MjM4Mn0.Bk4k19nbbKMd5CKQsV4mg4nRFxXEwvvzRI4Wm-ymhoE"
    );

    console.log("✅ Token saved");
  }
});
