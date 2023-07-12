import { Schema, model } from "mongoose";

const bookmarkSchema = new Schema(
  {
    list: { type: Schema.Types.ObjectId, ref: "List" },
    story: { type: Schema.Types.ObjectId, ref: "Story" },
  },
  { timestamps: true }
);

export const Bookmark = model("Bookmark", bookmarkSchema);
