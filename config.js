// Read environment variables
import { config } from "dotenv";
config();

const configurations = {
  PORT: process.env.PORT || 3000,
  MONGODB_USER: process.env.MONGODB_USER || "root",
  MONGODB_PASSWORD: process.env.MONGODB_PASSWORD || "example",
  MONGODB_DATABASE: process.env.MONGODB_DB || "mongo:27017",
};

configurations.MONGODB_URI = `mongodb${
  process.env.LOCAL === "True" ? "" : "+srv"
}://${configurations.MONGODB_USER}:${configurations.MONGODB_PASSWORD}@${
  configurations.MONGODB_DATABASE
}`;

configurations.MONGODB_URI =
  process.env.TESTING === "True"
    ? "mongodb://test:test@mongo_tests:27018"
    : configurations.MONGODB_URI;

export default configurations;
