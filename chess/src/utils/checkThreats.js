import pawnMoves from './moves/pawnMoves'
import knightMoves from './moves/knightMoves'
import bishopMoves from './moves/bishopMoves'
import rookMoves from './moves/rookMoves'
import queenMoves from './moves/queenMoves'
import kingMoves from './moves/kingMoves'

export default function checkThreats(board, colour) {
    const threats = []
    for (let square of board) {
        if (square.piece.type && square.piece.colour === colour) {
            switch (square.piece.type) {
                case "Pawn":
                    Array.prototype.push.apply(threats, pawnMoves(board, square.index, square.piece))
                    break
                case "Knight":
                    Array.prototype.push.apply(threats, knightMoves(board, square.index, square.piece))
                    break
                case "Bishop":
                    Array.prototype.push.apply(threats, bishopMoves(board, square.index, square.piece))
                    break
                case "Rook":
                    Array.prototype.push.apply(threats, rookMoves(board, square.index, square.piece))
                    break
                case "Queen":
                    Array.prototype.push.apply(threats, queenMoves(board, square.index, square.piece))
                    break
                case "King":
                    Array.prototype.push.apply(threats, kingMoves(board, square.index, square.piece))
                    break
                default:
                    break
            }
        }
    }
    return threats
}