import rookThreats from './rookThreats'
import bishopThreats from './bishopThreats'

export default function queenMoves(board, index, piece) {
    const legalRookThreats = rookThreats(board, index, piece)
    const legalBishopThreats = bishopThreats(board, index, piece)
    return legalRookThreats.concat(legalBishopThreats);
}
