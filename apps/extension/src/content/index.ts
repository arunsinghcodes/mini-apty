import { captureElement } from "./recorder/captureElement";
import { getBestElement } from "../utils/getBestElement";
import type { ElementTarget } from "@mini-apty/shared";

console.log("🚀 Content Script Loaded");

let recording = true;

const recorder = {
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
  true
);
