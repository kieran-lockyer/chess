const uuidv4 = require('uuid/v4');

const Game = require('./models/game');
const User = require('./models/user');
const Connection = require('./models/connection');

function rules(connection, req, games) {
    connection.on('message', (message) => {
        console.log(message)
        const data = JSON.parse(message)
        if (data.action === 'searching') {
            const player = data.token
            let openGameFound = false
            for (let game of games) {
                if (game.white && !game.black || game.white === player) {
                    if (game.white === player) {
                        break
                    } else {
                        game.black = player
                        game.connections.push(connection)
                        openGameFound = true
                        connection.send(JSON.stringify({token: game.black, position: 'Black', state: 'begin'}))
                        game.connections[0].send(JSON.stringify({state: 'begin'}))
                        break
                    }
                }
            }
            if (!openGameFound) {
                const newGame = { 
                    id: uuidv4(),
                    white: player,
                    connections: [connection]
                }
                games.push(newGame)
                connection.send(JSON.stringify({token: newGame.white, position: 'White'}))
            }
        } else if (data.action === 'move') {
            for (let game of games) {
                if (game.white === data.token || game.black === data.token) {
                    for (connection of game.connections) {
                        connection.send(JSON.stringify({move: data.move, token: data.token}))
                    }
                }
            }
        } else if (data.action === 'promote_pawn') {
            for (let game of games) {
                if (game.white === data.token || game.black === data.token) {
                    for (connection of game.connections) {
                        connection.send(JSON.stringify({promote_pawn: data.move, token: data.token}))
                    }
                }
            }
        }
    })
}

module.exports = {
    rules
}