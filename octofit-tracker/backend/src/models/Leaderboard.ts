import { Schema, model } from 'mongoose';

const leaderboardSchema = new Schema(
  {
    rank: { type: Number, required: true },
    userName: { type: String, required: true },
    team: { type: String, required: true },
    points: { type: Number, required: true },
  },
  { timestamps: true },
);

export default model('Leaderboard', leaderboardSchema);