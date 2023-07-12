import fs from "node:fs";
import http from "http";
import cors from "cors";
import express from "express";
import bodyParser from "body-parser";

import mongoose from "mongoose";

import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";

import { credential } from "firebase-admin";
import { getAuth } from "firebase-admin/auth";
import { initializeApp, ServiceAccount } from "firebase-admin/app";

import serviceAccount from "../serviceAccount.json";
import { AuthenticationError } from "./exceptions";
// import { FirebaseProvider } from "./services/firebase_user";

import schema from "./schema";
import { BaseContext } from "./types/context";
import { User } from "./models/user.model";

initializeApp({
  credential: credential.cert(serviceAccount as ServiceAccount),
});

mongoose
  .connect("mongodb://localhost:27017/oasis?directConnection=true", {})
  .then((mongoose) => {
    mongoose.connection.db.dropDatabase();
    const app = express();
    const httpServer = http.createServer(app);

    const server = new ApolloServer<BaseContext>({
      schema: schema,
      plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
    });

    server.start().then(async () => {
      app.use(
        cors(),
        bodyParser.json(),
        expressMiddleware<BaseContext>(server, {
          context: async ({ req }) => {
            const token = req.headers.authorization
              ?.replace("Token ", "")
              .trim();

            if (token) {
              // const user = await FirebaseProvider.tokenAuthentication(token);
              const firebaseUser = await getAuth().getUser(token);
              const user = (await User.findOne()
                .where({
                  uid: firebaseUser.uid,
                })
                .lean()
                .exec()) as any;

              return {
                user,
                firebaseUser,
              };
            }

            throw new AuthenticationError("Invalid idToken");
          },
        })
      );

      httpServer.listen({ port: 4000 }, () => {
        console.log(`🚀 Server ready at http://127.0.0.0:4000`);
      });
    });
  });
