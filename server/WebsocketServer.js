const uuidv4 = require("uuid/v4");
const { Server } = require("ws");

const Game = require("./models/Game");
const User = require("./models/User");
const Connection = require("./models/Connection");

wss.on("connection", (connection, req) => {
  websocket.rules(connection, req, games);
});

class WebsocketServer {
  constructor(app) {
    this.wss = new Server({ app });
    this.games = [];
  }

  start = () => {
    this.wss.on("connection", this.onConnection(ws));
  };

  onConnection = (ws) => {
    ws.on("message", this.onMessage(message));
  };

  onMessage = (message) => {
    const { action, user, board } = JSON.parse(message);

    switch (action) {
      case "searching":
        this.searchForGame();
      case "move":
        this.makeMove();
      case "promote":
        this.promote();
      default:
        break;
    }
  };

  onClose = () => {};

  searchForGame = () => {
    for (let game of this.games) {
      // If game has a white player, and no black player
      if (game.white && !game.black) {
        // if the white player is not the user looking for a game
        if (game.white.id !== user.id) {
          // Add the user to the game as the black player and set the game state to begin
          game.black = user;
          game.connections.push(connection);
          openGameFound = true;
          connection.send(
            JSON.stringify({
              position: "Black",
              state: "begin",
            })
          );
          game.connections[0].send(JSON.stringify({ state: "begin" }));
          break;
        }
      }
    }
    if (!openGameFound) {
      const newGame = {
        id: uuidv4(),
        white: user,
        connections: [connection],
      };
      games.push(newGame);
      connection.send(
        JSON.stringify({ token: newGame.white, position: "White" })
      );
    }
  };

  makeMove = () => {};

  promote = () => {};

  endGame = () => {};
}

function rules(connection, req, games) {
  connection.on("message", (message) => {
    const data = JSON.parse(message);
    const user = data.user;

    // If user is searching for a game
    if (data.action === "searching") {
      let openGameFound = false;

      // Look though the list of games
    } else if (data.action === "move") {
      for (let game of games) {
        if (game.white === data.token || game.black === data.token) {
          for (connection of game.connections) {
            connection.send(
              JSON.stringify({ move: data.move, token: data.token })
            );
          }
        }
      }
    } else if (data.action === "promote_pawn") {
      for (let game of games) {
        if (game.white === data.token || game.black === data.token) {
          for (connection of game.connections) {
            connection.send(
              JSON.stringify({ promote_pawn: data.move, token: data.token })
            );
          }
        }
      }
    }
  });
}

module.exports = {
  WebsocketServer,
};
