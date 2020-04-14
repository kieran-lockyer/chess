import {squareIsOnBoard, squareCanBeAttacked, isOnSameDiagonal, squareIsOccupied, isKingInCheck} from '../common'

export default function bishopMoves(board, index, piece) {
    const possibleMovesLeft = [7, 14, 21, 28, 35, 42, 49]
    const possibleMovesRight = [9, 18, 27, 36, 45, 54, 63]
    const legalMoves = []
    for (let move of possibleMovesLeft) {
        let newSquare = index + move
        if (squareIsOnBoard(newSquare)) {
            if (isOnSameDiagonal(index, newSquare)) {
                if (squareIsOccupied(board, newSquare)) {
                    if (squareCanBeAttacked(board, newSquare, piece)) {
                        if (!isKingInCheck(board, index, newSquare, piece)) {
                            legalMoves.push(newSquare)
                        }
                    }
                    break
                }
                if (!isKingInCheck(board, index, newSquare, piece)) {
                    legalMoves.push(newSquare)
                }
            }
        }
    }
    for (let move of possibleMovesLeft) {
        let newSquare = index - move
        if (squareIsOnBoard(newSquare)) {
            if (isOnSameDiagonal(index, newSquare)) {
                if (squareIsOccupied(board, newSquare)) {
                    if (squareCanBeAttacked(board, newSquare, piece)) {
                        if (!isKingInCheck(board, index, newSquare, piece)) {
                            legalMoves.push(newSquare)
                        }
                    }
                    break
                }
                if (!isKingInCheck(board, index, newSquare, piece)) {
                    legalMoves.push(newSquare)
                }
            }
        }
    }
    for (let move of possibleMovesRight) {
        let newSquare = index + move
        if (squareIsOnBoard(newSquare)) {
            if (isOnSameDiagonal(index, newSquare)) {
                if (squareIsOccupied(board, newSquare)) {
                    if (squareCanBeAttacked(board, newSquare, piece)) {
                        if (!isKingInCheck(board, index, newSquare, piece)) {
                            legalMoves.push(newSquare)
                        }
                    }
                    break
                }
                if (!isKingInCheck(board, index, newSquare, piece)) {
                    legalMoves.push(newSquare)
                }
            }
        }
    }
    for (let move of possibleMovesRight) {
        let newSquare = index - move
        if (squareIsOnBoard(newSquare)) {
            if (isOnSameDiagonal(index, newSquare)) {
                if (squareIsOccupied(board, newSquare)) {
                    if (squareCanBeAttacked(board, newSquare, piece)) {
                        if (!isKingInCheck(board, index, newSquare, piece)) {
                            legalMoves.push(newSquare)
                        }
                    }
                    break
                }
                if (!isKingInCheck(board, index, newSquare, piece)) {
                    legalMoves.push(newSquare)
                }
            }
        }
    }
    return legalMoves;
}
