const mongoose = require("mongoose");
const Schema = mongoose.Schema;

import { UserSchema } from "./User";

export const GameSchema = new Schema({
  start_date: {
    type: Date,
    default: Date.now,
  },
  white: UserSchema.Schema,
  black: UserSchema.Schema,
  mode: String,
  time_limit: Number,
  increment: Number,
});

const Game = mongoose.model("game", GameSchema);

module.exports = Game;
