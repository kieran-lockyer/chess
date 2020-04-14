const mongoose = require('mongoose');
const Schema = mongoose.Schema;

import { GameSchema } from './game';
import { ConnectionSchema } from './connection';

export const UserSchema = new Schema({
    email: String,
    displayName: String,
    joined: Date,
    games: [GameSchema.Schema],
    connections: [ConnectionSchema.Schema]
});

const User = mongoose.model('user', UserSchema);

module.exports = User;
