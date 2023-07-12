import { Schema, model } from "mongoose";

const historySchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User" },
  story: { type: Schema.Types.ObjectId, ref: "Story" },
});

export const History = model("History", historySchema);
