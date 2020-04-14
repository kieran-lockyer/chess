const mongoose = require("mongoose");
const Schema = mongoose.Schema;

import { GameSchema } from "./Game";

export const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  displayName: {
    type: String,
    required: true,
  },
  registered_date: {
    type: Date,
    default: Date.now,
  },
  games: {
    type: [GameSchema.Schema],
    default: [],
  },
});

const User = mongoose.model("users", UserSchema);

module.exports = User;
