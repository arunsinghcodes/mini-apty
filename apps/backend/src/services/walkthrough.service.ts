import Walkthrough from "../models/Walkthrough.js";

export async function createWalkthrough(data: any) {
  return Walkthrough.create(data);
}

export async function getWalkthroughs(ownerId: string) {
  return Walkthrough.find({ ownerId });
}

export async function getWalkthroughById(id: string, ownerId: string) {
  return Walkthrough.findOne({
    _id: id,
    ownerId,
  });
}

export async function updateWalkthrough(
  id: string,
  ownerId: string,
  payload: any,
) {
  return Walkthrough.findOneAndUpdate(
    {
      _id: id,
      ownerId,
    },
    payload,
    {
      new: true,
    },
  );
}


export async function deleteWalkthrough(
  id: string,
  ownerId: string
) {
  return Walkthrough.findOneAndDelete({
    _id: id,
    ownerId,
  });
}