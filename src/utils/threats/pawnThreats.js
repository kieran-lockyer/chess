import {squareIsOnBoard, isOnSameDiagonal} from '../common'

export default function pawnAttacks(board, index, piece) {
    const possibleMoves = [7, 9]
    const legalThreats = []
    for (let move of possibleMoves) {
        if (piece.colour === "White") {
            let newSquare = index + move
            if (squareIsOnBoard(newSquare)) {
                if (move === 7 || move === 9) {
                    if (isOnSameDiagonal(index, newSquare)) {
                        legalThreats.push(newSquare)
                    }
                }
            }
        } else {
            let newSquare = index - move
            if (squareIsOnBoard(newSquare)) {
                if (move === 7 || move === 9) {
                    if (isOnSameDiagonal(index, newSquare)) {
                        legalThreats.push(newSquare)
                    }
                }
            }
        }
    }
    return legalThreats;
}