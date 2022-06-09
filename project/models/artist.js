import { mongoose } from "mongoose";
import worldLocations from "../helpers/worldLocations.js";
const Schema = mongoose.Schema;

const artistSchema = new Schema(
  {
    name: { type: String, required: true },
    plays: { type: Number, required: true, default: 0 },
    uid: { type: String, required: true },
    location: {
      type: String,
      required: false,
      enum: worldLocations,
    },
    isDeleted: { type: Boolean, required: false, default: false },
  },
  {
    timestamps: true,
    collection: "artists",
  },
);

export const Artist = mongoose.model("artists", artistSchema);
