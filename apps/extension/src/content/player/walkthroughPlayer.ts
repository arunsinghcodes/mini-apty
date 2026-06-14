import { findElement } from "./findElement";
import { highlightElement } from "./highlight";
import { createOverlay } from "../overlay/createOverlay";
import { updateOverlay } from "../overlay/updateOverlay";
import { removeOverlay } from "../overlay/removeOverlay";
import { positionOverlay } from "../overlay/positionOverlay";

export class WalkthroughPlayer {
  private currentStep = 0;

  constructor(private walkthrough: any) {}

  start() {
    console.log("Walkthrough received:", this.walkthrough);

    createOverlay();

    this.currentStep = 0;

    this.showStep();
  }

  next() {
    if (this.currentStep >= this.walkthrough.steps.length - 1) {
      this.close();
      return;
    }

    this.currentStep++;

    this.showStep();
  }

  previous() {
    if (this.currentStep === 0) {
      return;
    }

    this.currentStep--;

    this.showStep();
  }

  close() {
    removeOverlay();
    this.currentStep = 0;
  }

  private async showStep() {
    // console.log("showStep called");

    const step = this.walkthrough.steps[this.currentStep];

    // console.log("step", step);

    const element = findElement(step);

    // console.log("element", element);

    if (!element) {
      // console.log("element not found");
      return;
    }

    // console.log("before scroll");

    (element as HTMLElement).scrollIntoView({
      behavior: "smooth",
      block: "center",
    });

    await new Promise((resolve) => setTimeout(resolve, 500));

    // console.log("before highlight");

    highlightElement(element as HTMLElement);

    // console.log("before updateOverlay");

    updateOverlay(
      this.currentStep + 1,
      this.walkthrough.steps.length,
      step.accessibleText || "Interact with this element",
    );

    // console.log("before positionOverlay");

    positionOverlay(element as HTMLElement);

    // console.log("after positionOverlay");
  }
}
