import assert from "assert";
import { User } from "../src/models/user.model.js";

const uniqueId = "62ed7b2bc98d3b000f000001";

// beforeEach((done) => {
//   return User.create({
//     id: uniqueId,
//     username: "test_user",
//   }).then(() => done()).catch(console.log);
// });

describe("user model", () => {
  it("creates new user", () => {
    User.create({
      username: "new_test_user",
    }).then((value) => {
      assert.equal(value.isNew, true);
    });
  });

  it("retrieve a non existing user", () => {
    User.findById(uniqueId).then((doc) => {
      console.log(doc);
      assert.notEqual(doc?.$isEmpty, true);
    });
  });
});
