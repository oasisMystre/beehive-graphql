import { Schema, model } from "mongoose";
import { composeMongoose } from "graphql-compose-mongoose";


const userSchema = new Schema(
  {
    uid: { type: String, unique: true, require: true },
    username: { type: String, unique: true, required: true },
    about: String,
    biography: String,
  },
  { timestamps: true }
);

const userMetaSchema = new Schema({
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
    require: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    require: true,
  },
  mute: { type: Boolean, default: false },
  block: { type: Boolean, default: false },
  following: { type: Boolean, default: false },
  subscribe: { type: Boolean, default: false },
});

userMetaSchema.index({ owner: 1, user: 1 }, { unique: true });

export const User = model("User", userSchema);
export const UserMeta = model("UserMeta", userMetaSchema);