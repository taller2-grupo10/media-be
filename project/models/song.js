import { mongoose } from "mongoose";
const Schema = mongoose.Schema;

const songSchema = new Schema(
  {
    title: { type: String, required: true },
    artist: { type: Schema.Types.ObjectId, ref: "artist" },
    album: { type: Schema.Types.ObjectId, ref: "album" },
    plays: { type: Number, required: true, default: 0 },
    genre: { type: String, required: false },
  },
  {
    timestamps: true,
    collection: "song",
  },
);

export const Song = mongoose.model("song", songSchema);
