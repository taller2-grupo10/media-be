import mongoose from "mongoose";
import configurations from "./config.js";

let URI = configurations.MONGODB_URI;

(async () => {
  try {
    const db = await mongoose.connect(URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("[DATABASE] Mongodb is connected to", db.connection.host);
  } catch (error) {
    console.error(error);
  }
})();
