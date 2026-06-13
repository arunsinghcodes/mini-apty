import { findElement } from "./findElement";
import { highlightElement } from "./highlight";

export async function playWalkthrough(walkthrough: any) {
  for (const step of walkthrough.steps) {
    const element = findElement(step);

    if (!element) {
      continue;
    }

    highlightElement(element as HTMLElement);

    await new Promise((resolve) => setTimeout(resolve, 2500));
  }

  console.log("🎉 Walkthrough completed");
}
