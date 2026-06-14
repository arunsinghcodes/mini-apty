import Walkthrough from "../models/Walkthrough.js";

export async function createWalkthrough(data: any) {
  return Walkthrough.create(data);
}

export async function getWalkthroughs(origin: string) {
  return Walkthrough.find({
    origin,
  }).select("_id title origin pathPattern")
  .sort({ createdAt: -1 }); // newest first
}

export async function getWalkthroughById(id: string,) {
  return  Walkthrough.findById(id);
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