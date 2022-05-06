// test/test_helper.js

import { mongoose } from "mongoose";

// tells mongoose to use ES6 implementation of promises
mongoose.Promise = global.Promise;
const MONGODB_URI = "mongodb://test:test@mongo_tests:27018";
mongoose.connect(MONGODB_URI);

mongoose.connection
  .once("open", () => console.log("[TEST] Connected!"))
  .on("error", (error) => {
    console.warn("[TEST] Error : ", error);
  });

// runs before each test
beforeEach((done) => {
  console.log("[DATABASE] Clearing the database");
  mongoose.connection.collections.artist.drop(() => {
    //this function runs after the drop is completed
    done(); //go ahead everything is done now.
  });
});