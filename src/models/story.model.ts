import { Schema, model } from "mongoose";

const storySchema = new Schema(
  {
    content: String,
    title: String,
    description: String,
    previewImage: String,
    duration: Number,
    creator: Schema.Types.ObjectId,
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

storySchema.virtual("likes", {
  count: true,
  ref: "StoryLike",
  localField: "_id",
  foreignField: "story",
});

storySchema.virtual("comments", {
  count: true,
  ref: "StoryComment",
  localField: "_id",
  foreignField: "story",
});

const storyLikeSchema = new Schema(
  {
    story: { ref: "Story", type: Schema.Types.ObjectId },
    user: { ref: "User", type: Schema.Types.ObjectId, unique: true },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

const storyCommentSchema = new Schema(
  {
    content: String,
    story: { ref: "Story", type: Schema.Types.ObjectId },
    parent: { type: Schema.Types.ObjectId, ref: "StoryComment" },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

storyCommentSchema.virtual("replies", {
  count: true,
  ref: "StoryComment",
  localField: "_id",
  foreignField: "parent",
});

export const Story = model("Story", storySchema);
export const StoryLike = model("StoryLike", storyLikeSchema);
export const StoryComment = model("StoryComment", storyCommentSchema);
