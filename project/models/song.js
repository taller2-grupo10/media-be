import { mongoose } from "mongoose";
const Schema = mongoose.Schema;

const songSchema = new Schema(
  {
    title: { type: String, required: true },
    artists: {
      artists: [{ type: Schema.Types.ObjectId, ref: "artists" }],
      names: [{ type: String, required: false }],
    },
    album: {
      album: { type: Schema.Types.ObjectId, ref: "albums" },
      name: { type: String, required: false },
    },
    plays: { type: Number, required: true, default: 0 },
    genres: [
      {
        type: String,
        required: false,
        enum: ["Unspecified", "Rock", "Trap"],
        default: "Unspecified",
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
