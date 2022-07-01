import { mongoose } from "mongoose";
const Schema = mongoose.Schema;

const playlistSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    owner: { type: Schema.Types.ObjectId, ref: "artists", required: true },
    collaborators: [{ type: Schema.Types.ObjectId, ref: "artists" }],
    plays: { type: Number, required: true, default: 0 },
    songs: [{ type: Schema.Types.ObjectId, ref: "songs" }],
    isDeleted: { type: Boolean, required: false, default: false },
    isActive: { type: Boolean, required: false, default: true },
  },
  {
    timestamps: true,
    collection: "playlists",
  },
);

export const Playlist = mongoose.model("playlists", playlistSchema);
