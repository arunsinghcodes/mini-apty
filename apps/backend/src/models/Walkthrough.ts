import mongoose from "mongoose";

const StepSchema = new mongoose.Schema(
  {
    order: Number,
    title: String,
    description: String,
    target: Object,
    advanceTrigger: String,
  },
  { _id: false },
);

const WalkthroughSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    origin: String,
    pathPattern: String,
    ownerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    steps: [StepSchema],
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("Walkthrough", WalkthroughSchema);
