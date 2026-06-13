import { captureElement } from "./recorder/captureElement";
import { getBestElement } from "../utils/getBestElement";
import type { ElementTarget } from "@mini-apty/shared";
import { saveWalkthrough } from "../api/walkthroughApi";

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
    const target = getBestElement(event.target as HTMLElement);
    const step = captureElement(target);
    recorder.steps.push(step);
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

    console.log("Hllo",{
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
