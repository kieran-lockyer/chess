let board = {
    1: {
        1: {piece: { type: "pawn", colour: "white" }},
        2: {piece: {}},
        3: {piece: {}},
        4: {piece: {}},
        5: {piece: {}},
        6: {piece: {}},
        7: {piece: {}},
        8: {piece: {}}
    },
    2: {
        1: {piece: {}},
        2: {piece: { type: "pawn", colour: "black" }},
        3: {piece: {}},
        4: {piece: {}},
        5: {piece: {}},
        6: {piece: {}},
        7: {piece: {}},
        8: {piece: {}}
    },
    3: {
        1: {piece: {}},
        2: {piece: {}},
        3: {piece: {}},
        4: {piece: {}},
        5: {piece: {}},
        6: {piece: {}},
        7: {piece: {}},
        8: {piece: {}}
    },
    4: {
        1: {piece: {}},
        2: {piece: {}},
        3: {piece: {}},
        4: {piece: {}},
        5: {piece: {}},
        6: {piece: {}},
        7: {piece: {}},
        8: {piece: {}}
    },
    5: {
        1: {piece: {}},
        2: {piece: {}},
        3: {piece: {}},
        4: {piece: {}},
        5: {piece: {}},
        6: {piece: {}},
        7: {piece: {}},
        8: {piece: {}}
    },
    6: {
        1: {piece: {}},
        2: {piece: {}},
        3: {piece: {}},
        4: {piece: {}},
        5: {piece: {}},
        6: {piece: {}},
        7: {piece: {}},
        8: {piece: {}}
    },
    7: {
        1: {piece: {}},
        2: {piece: {}},
        3: {piece: {}},
        4: {piece: {}},
        5: {piece: {}},
        6: {piece: {}},
        7: {piece: {}},
        8: {piece: {}}
    },
    8: {
        1: {piece: {}},
        2: {piece: {}},
        3: {piece: {}},
        4: {piece: {}},
        5: {piece: {}},
        6: {piece: {}},
        7: {piece: {}},
        8: {piece: {}}
    },
}

let moveMap = {
    "pawn": {
        caputre
    }
}

const isOnBoard = coord => {
    if (coord[0] >= 0 && coord[0] <= 8) {
        if (coord[1] >= 0 && coord[1] <= 8) {
            return true
        }
    }
    return false
}

const checkUpLeft = coord => {
    let space = board[coord[0]][coord[1]]
    if (space.piece.type) {
        if (space.piece.colour === piece.colour) {
            return 'defending'
        } else {
            return 'capture'
        }
    } else {
        return 'free'
    }
}

const checkUpLeft = coord => {

}

const checkUpLeft = coord => {

}

const checkUpLeft = coord => {

}

const checkUp = coord => {

}

const checkDown = coord => {

}

const checkLeft = coord => {

}

const checkRight = coord => {

}

const CheckKnight = coord => {

}

const showLegalMoves = (piece, position) => {
    let legalMoves = []
    if (piece.type == "pawn") {
        if (!board[position[0]][position[1] + 1].piece.type) {
            legalMoves.push([position[0], position[1] + 1])
        }
        if (board[position[0] + 1][position[1] + 1].piece.type && board[position[0] + 1][position[1] + 1].piece.colour !== piece.colour) {
            legalMoves.push([position[0] + 1, position[1] + 1])
        }
        if (board[position[0] - 1] && board[position[0] - 1][position[1] + 1].piece.type && board[position[0] - 1][position[1] + 1].piece.colour !== piece.colour) {
            legalMoves.push([position[0] - 1, position[1] + 1])
        }
    }
    return legalMoves
}

console.log(board)

console.log(showLegalMoves(board[1][1].piece, [1, 1]))