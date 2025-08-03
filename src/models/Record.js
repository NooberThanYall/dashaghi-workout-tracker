// import { model, models, Schema } from "mongoose";

import pkg from "mongoose";
const { model, models, Schema } = pkg;

const recordSchema = new Schema(
  {
    userId: {
      type: "ObjectId",
      ref: "User",
    },
    exercise: String,
    reps: Number,
    weight: Number,
  },
  { timestamps: true }
);

export const Record = models.Record || model("Record", recordSchema);
