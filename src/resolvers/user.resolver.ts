import { composeMongoose } from "graphql-compose-mongoose";

import { TopicFollower } from "../models/topic.model";
import { User, UserMeta } from "../models/user.model";
import type { TResolveParams } from "./types/wrapper.t";

const userTC = composeMongoose<any>(User);
const userMetaTC = composeMongoose<any>(UserMeta);

userTC.addFields({
  followers: {
    type: "Int",
    resolve: (source) => {
      return UserMeta.where({
        "owner.id": source.id,
        following: true,
        block: false,
      })
        .countDocuments()
        .exec();
    },
  },
  following: {
    type: "Int",
    resolve: (source) =>
      UserMeta.where({ "user.id": source.id, following: true, block: false })
        .countDocuments()
        .exec(),
  },
  topics: {
    type: "Int",
    resolve: (source) =>
      TopicFollower.where({ "user.id": source.id })
        .estimatedDocumentCount()
        .exec(),
  },
});

userMetaTC.addRelation("owner", {
  resolver: () => userTC.mongooseResolvers.findById(),
  prepareArgs: {
    _id: (source) => source.owner,
  },
  projection: { owner: true },
});

userMetaTC.addRelation("user", {
  resolver: () => userTC.mongooseResolvers.findById(),
  prepareArgs: {
    _id: (source) => source.user,
  },
  projection: { user: true },
});

type TUserResolveParams = TResolveParams<InstanceType<typeof User>>;

export const userQuery = {
  users: userTC.mongooseResolvers.findMany(),
  user: userTC.mongooseResolvers.findById(),
  userMeta: userMetaTC.mongooseResolvers.findMany({
    filter: { removeFields: [], isRequired: true },
  }),
};

export const userMutation = {
  createUser: userTC.mongooseResolvers.createOne(),
  updateUser: userTC.mongooseResolvers
    .updateById()
    .wrapResolve((next) => (rp: TUserResolveParams) => {
      rp.beforeRecordMutate = function (
        doc: InstanceType<typeof User>,
        { context }: TUserResolveParams
      ) {
        if (doc && doc.uid === context.user.uid) return doc;
      };

      return next(rp);
    }),
  createUserMeta: userMetaTC.mongooseResolvers.createOne(),
  updateUserMeta: userMetaTC.mongooseResolvers.updateById({
    record: { removeFields: ["owner "] },
  }),
};
