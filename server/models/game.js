const mongoose = require('mongoose');
const Schema = mongoose.Schema;

import { UserSchema } from './user'

export const GameSchema = new Schema({
    date: Date,
    white: UserSchema.Schema,
    black: UserSchema.Schema,
    mode: String,
    time: String
});

const Game = mongoose.model('game', GameSchema);

module.exports = Game;
