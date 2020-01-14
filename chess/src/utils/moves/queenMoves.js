import rookMoves from './rookMoves'
import bishopMoves from './bishopMoves'

export default function queenMoves(board, index, piece) {
    const legalRookMoves = rookMoves(board, index, piece)
    const legalBishopMoves = bishopMoves(board, index, piece)
    return legalRookMoves.concat(legalBishopMoves);
}
