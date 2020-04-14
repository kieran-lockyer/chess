const express = require('express');
const mongoose = require('mongoose');
const websocket = require('./websocket.js');
const { Server } = require('ws');
const authRoutes = require('./routes/auth-routes');

const PORT = process.env.PORT || 3001;
const INDEX = '/index.html';

mongoose.connect(`mongodb://localhost/test`);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', function() {
    console.log('db connected');
})

const app = express()
  .use((req, res) => res.sendFile(INDEX, { root: __dirname }))
  .listen(PORT, () => console.log(`Listening on ${PORT}`))

app.use('/auth', authRoutes);

app.get('/', (req, res) => {
  // do something
});

const wss = new Server({ app });

const games = []

wss.on('connection', (connection, req) => {
    websocket.rules(connection, req, games)
})