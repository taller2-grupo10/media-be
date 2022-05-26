// test/test_helper.js

import { mongoose } from "mongoose";
import createApp from "../createApp.js";

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
  Object.keys(mongoose.connection.collections).forEach((collection) => {
    mongoose.connection.collections[collection].drop().then();
  });
  done();
});

var app = createApp({ PORT: 3000 });
export const testUrl = "http://localhost:3000";

app.listen(app.get("port"), () =>
  console.log(`[APP] Server Running successfully`),
);
