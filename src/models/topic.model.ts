import { Schema, model } from "mongoose";

const topicSchema = new Schema(
  {
    name: String,
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const topicFollowerSchema = new Schema({
  topic: { type: Schema.Types.ObjectId, ref: "Topic" },
  user: { type: Schema.Types.ObjectId, ref: "User " },
});

topicSchema.virtual("stories", {
  count: true,
  ref: "Story",
  localField: "_id",
  foreignField: "topics",
});

topicSchema.virtual("followers", {
  count: true,
  ref: "TopicFollower",
  localField: "_id",
  foreignField: "topic",
});

export const Topic = model("Topic", topicSchema);
export const TopicFollower = model("TopicFollower", topicFollowerSchema);
