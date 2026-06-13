import Walkthrough from "../models/Walkthrough.js";

export async function createWalkthrough(data: any) {
  return Walkthrough.create(data);
}

export async function getWalkthroughs(ownerId: string) {
  return Walkthrough.find({ ownerId });
}
