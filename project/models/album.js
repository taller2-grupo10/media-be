import { mongoose } from "mongoose";
import musicGenres from "../helpers/musicGenres.js";
const Schema = mongoose.Schema;

const albumSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: false },
    artist: {
      artist: { type: Schema.Types.ObjectId, ref: "artists" },
      name: { type: String, required: false },
    },
    plays: { type: Number, required: true, default: 0 },
    likes: { type: Number, required: true, default: 0 },
    genres: [
      {
        type: String,
        required: false,
        enum: musicGenres,
        default: "Other",
      },
    ],
    photoURL: { type: String, required: false },
    isDeleted: { type: Boolean, required: false, default: false },
  },
  {
    timestamps: true,
    collection: "albums",
  },
);

export const Album = mongoose.model("albums", albumSchema);
