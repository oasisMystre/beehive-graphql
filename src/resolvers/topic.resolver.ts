import { composeWithMongoose } from "graphql-compose-mongoose";
import { Topic } from "../models/topic.model";

const topicTC = composeWithMongoose(Topic);

export const topicQuery = {
  topics: topicTC.getResolver("findMany"),
  topic: topicTC.getResolver("findById"),
};
