import { FlattenMaps } from "mongoose";
import { UserRecord } from "firebase-admin/auth";

import { User } from "../models/user.model";

export type BaseContext = {
  firebaseUser: UserRecord;
  user: FlattenMaps<InstanceType<typeof User>>;
};
