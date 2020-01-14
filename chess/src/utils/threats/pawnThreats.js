import {squareIsOnBoard, squareIsOccupied, squareCanBeAttacked, isOnSameRow} from '../common'

export default function pawnAttacks(board, index, piece) {
    const possibleMoves = [7, 9]
    const legalMoves = []
    for (let move of possibleMoves) {
        if (piece.colour === "White") {
            let newSquare = index + move
            if (squareIsOnBoard(newSquare)) {
                if (move === 7 || move === 9) {
                    if (squareCanBeAttacked(board, newSquare, piece)) {
                        if (!isOnSameRow(index, newSquare)) {
                            legalMoves.push(newSquare) 
                        }
                    }
                }
            }
        } else {
            let newSquare = index - move
            if (squareIsOnBoard(newSquare)) {
                if (move === 7 || move === 9) {
                    if (squareCanBeAttacked(board, newSquare, piece)) {
                        if (!isOnSameRow(index, newSquare)) {
                            legalMoves.push(newSquare)
                        }
                    }
                }
            }
        }
    }

    return legalMoves;
}