import pawnThreats from './threats/pawnThreats'
import knightThreats from './threats/knightThreats'
import bishopThreats from './threats/bishopThreats'
import rookThreats from './threats/rookThreats'
import queenThreats from './threats/queenThreats'
import kingThreats from './threats/kingThreats'

export default function checkThreats(board, colour) {
    const threats = []
    for (let square of board) {
        if (square.piece.type && square.piece.colour === colour) {
            switch (square.piece.type) {
                case "Pawn":
                    Array.prototype.push.apply(threats, pawnThreats(board, square.index, square.piece))
                    break
                case "Knight":
                    Array.prototype.push.apply(threats, knightThreats(board, square.index, square.piece))
                    break
                case "Bishop":
                    Array.prototype.push.apply(threats, bishopThreats(board, square.index, square.piece))
                    break
                case "Rook":
                    Array.prototype.push.apply(threats, rookThreats(board, square.index, square.piece))
                    break
                case "Queen":
                    Array.prototype.push.apply(threats, queenThreats(board, square.index, square.piece))
                    break
                case "King":
                    Array.prototype.push.apply(threats, kingThreats(board, square.index, square.piece))
                    break
                default:
                    break
            }
        }
    }
    return [...new Set(threats)]
}