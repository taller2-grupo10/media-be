import { mongoose } from "mongoose";
import musicGenres from "../helpers/musicGenres.js";
const Schema = mongoose.Schema;

const songSchema = new Schema(
  {
    title: { type: String, required: true },
    artists: {
      artist: { type: Schema.Types.ObjectId, ref: "artists" },
      name: { type: String, required: true },

      collaborators: [{ type: Schema.Types.ObjectId, ref: "artists" }],
      collaboratorsNames: [{ type: String, required: false }],
    },
    album: {
      album: { type: Schema.Types.ObjectId, ref: "albums" },
      name: { type: String, required: false },
      photoURL: { type: String, required: false },
    },
    plays: { type: Number, required: true, default: 0 },
    genres: [
      {
        type: String,
        required: false,
        enum: musicGenres,
        default: "Other",
      },
    ],
    url: { type: String, required: true },
    isDeleted: { type: Boolean, required: false, default: false },
  },
  {
    timestamps: true,
    collection: "songs",
  },
);

export const Song = mongoose.model("songs", songSchema);

/*
on edit: song.artist_name = song.artist.name (must be updated first)
*/
