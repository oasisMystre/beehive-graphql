import { schemaComposer } from "graphql-compose";
import { userMutation, userQuery } from "./resolvers/user.resolver";
import { topicQuery } from "./resolvers/topic.resolver";

schemaComposer.Query.addFields(Object.assign({}, userQuery, topicQuery));
schemaComposer.Mutation.addFields(Object.assign({}, userMutation));

export default schemaComposer.buildSchema();
