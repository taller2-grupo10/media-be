import { mongoose } from "mongoose";
const Schema = mongoose.Schema;

const artistSchema = new Schema(
  {
    name: { type: String, required: true },
    plays: { type: Number, required: true, default: 0 },
    userId: { type: Number, required: true },
    isDeleted: { type: Boolean, required: false, default: false },
  },
  {
    timestamps: true,
    collection: "artists",
  },
);

export const Artist = mongoose.model("artists", artistSchema);
