import { mongoose } from "mongoose";
const Schema = mongoose.Schema;

const albumSchema = new Schema(
  {
    title: { type: String, required: true },
    artist: { type: Schema.Types.ObjectId, ref: "artist" },
    plays: { type: Number, required: true, default: 0 },
    likes: { type: Number, required: true, default: 0 },
    photoURL: { type: String, required: false },
  },
  {
    timestamps: true,
    collection: "album",
  },
);

export const Album = mongoose.model("album", albumSchema);
