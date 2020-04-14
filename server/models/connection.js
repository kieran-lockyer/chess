const mongoose = require('mongoose');
const Schema = mongoose.Schema;

import { UserSchema } from './user';

export const ConnectionSchema = new Schema({
    id: String,
    white: UserSchema.Schema,
    black: UserSchema.Schema,
});

const Connection = mongoose.model('connection', Connection);

module.exports = Connection;