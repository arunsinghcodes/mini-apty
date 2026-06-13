import { findElement } from "./findElement";
import { highlightElement } from "./highlight";
import { createOverlay } from "../overlay/createOverlay";
import { updateOverlay } from "../overlay/updateOverlay";
import { removeOverlay } from "../overlay/removeOverlay";

// export async function playWalkthrough(walkthrough: any) {
//   for (const step of walkthrough.steps) {
//     const element = findElement(step);

//     if (!element) {
//       continue;
//     }

//     highlightElement(element as HTMLElement);

//     await new Promise((resolve) => setTimeout(resolve, 2500));
//   }

//   console.log("🎉 Walkthrough completed");
// }



export async function playWalkthrough(walkthrough: any) {
  createOverlay();

  for (let i = 0; i < walkthrough.steps.length; i++) {
    const step = walkthrough.steps[i];

    const element = findElement(step);

    if (!element) {
      continue;
    }

    updateOverlay(
      i + 1,
      walkthrough.steps.length,
      step.accessibleText || "Interact with this element",
    );

    highlightElement(element as HTMLElement);

    await new Promise((resolve) => setTimeout(resolve, 2000));
  }

  removeOverlay();
}
