import { ElementTarget } from "./elementTarget";

export type AdvanceTrigger = "next-button" | "click-target" | "input-change";

export interface Step {
  id: string;
  order: number;
  title: string;
  description: string;
  target: ElementTarget;
  advanceTrigger: AdvanceTrigger;
}
