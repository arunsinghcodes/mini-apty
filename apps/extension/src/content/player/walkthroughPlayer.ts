import { findElement } from "./findElement";
import { highlightElement } from "./highlight";
import { createOverlay } from "../overlay/createOverlay";
import { updateOverlay } from "../overlay/updateOverlay";
import { removeOverlay } from "../overlay/removeOverlay";

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

  private showStep() {
    const step = this.walkthrough.steps[this.currentStep];

    if (!step) {
      return;
    }

    const element = findElement(step);

    if (element) {
      highlightElement(element as HTMLElement);
    }

    updateOverlay(
      this.currentStep + 1,
      this.walkthrough.steps.length,
      step.accessibleText || "Interact with this element",
    );
  }
}
