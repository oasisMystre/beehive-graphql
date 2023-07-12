import { auth } from "firebase-admin";
import {} from "firebase-admin/app";
import { FirebaseError } from "firebase-admin";
import { getAuth } from "firebase-admin/auth";

import { AuthenticationError } from "../exceptions";

export class UserProvider {
  static tokenAuthentication(token: String) {
    throw Error;
  }
}

export class FirebaseProvider implements UserProvider {
  static tokenAuthentication(token: string) {
    return getAuth()
      .verifyIdToken(token)
      .then(async (decodedIdToken) => {
        return getAuth().getUser(decodedIdToken.uid);
      })
      .catch((error: FirebaseError) => {
        if (error.code)
          return Promise.reject(
            new AuthenticationError(error.message, error.toJSON())
          );

        return Promise.reject(error);
      });
  }
}
