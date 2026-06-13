import mongoose from "mongoose";

const StepSchema = new mongoose.Schema(
  {
    tagName: String,
    id: String,
    classNames: [String],
    accessibleText: String,
    ariaLabel: String,
    role: String,
    name: String,
    placeholder: String,
    cssSelector: String,
    xpath: String,
    dataAttributes: mongoose.Schema.Types.Mixed,
  },
  {
    _id: false,
  }
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
