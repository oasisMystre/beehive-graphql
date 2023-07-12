import { Schema, model } from "mongoose";

const listSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User" },
    name: String,
    description: String,
    private: Boolean,
  },
  { timestamps: true }
);

const savedListScheme = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User" },
    list: { type: Schema.Types.ObjectId, ref: "List" },
  },
  { timestamps: true }
);

export const List = model("List", listSchema);
