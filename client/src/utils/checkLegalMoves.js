import pawnMoves from './moves/pawnMoves'
import knightMoves from './moves/knightMoves'
import bishopMoves from './moves/bishopMoves'
import rookMoves from './moves/rookMoves'
import queenMoves from './moves/queenMoves'
import kingMoves from './moves/kingMoves'

export default function checkLegalMoves(board, index, threats) {
    const {piece} = board[index]
    switch (piece.type) {
        case "Pawn":
            return pawnMoves(board, index, piece);
        case "Knight":
            return knightMoves(board, index, piece);
        case "Bishop":
            return bishopMoves(board, index, piece);
        case "Rook":
            return rookMoves(board, index, piece);
        case "Queen":
            return queenMoves(board, index, piece);
        case "King":
            return kingMoves(board, index, piece, threats);
        default:
            return
    }
}