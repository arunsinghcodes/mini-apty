import { Step } from "./step";

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
