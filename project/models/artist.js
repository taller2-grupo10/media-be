import { mongoose } from "mongoose";
const Schema = mongoose.Schema;

const artistSchema = new Schema(
  {
    name: { type: String, required: true },
    plays: { type: Number, required: true, default: 0 },
    songs: [{ type: Schema.Types.ObjectId, ref: "song" }],
    userId: { type: Number, required: true },
  },
  {
    timestamps: true,
    collection: "artist",
  },
);

export const Artist = mongoose.model("artist", artistSchema);
