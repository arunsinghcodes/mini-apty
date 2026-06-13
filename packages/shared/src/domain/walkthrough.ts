import { Step } from "./step.js";

export interface Walkthrough {
  id: string;
  title: string;
  origin: string;
  pathPattern: string;
  ownerId: string;
  steps: Step[];
  createdAt: Date;
  updatedAt: Date;
}
