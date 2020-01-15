import {squareIsOnBoard, squareIsOccupied, squareCanBeAttacked, isOnSameDiagonal, isKingInCheck} from '../common'

export default function pawnMoves(board, index, piece) {
    const possibleMoves = [7, 8, 9, 16]
    const legalMoves = []
    for (let move of possibleMoves) {
        if (piece.colour === "White") {
            let newSquare = index + move
            if (squareIsOnBoard(newSquare)) {
                if (move === 7 || move === 9) {
                    if (squareIsOccupied(board, newSquare)) {
                        if (squareCanBeAttacked(board, newSquare, piece)) {
                            if (isOnSameDiagonal(index, newSquare)) {
                                if (!isKingInCheck(board, index, newSquare, piece)) {
                                    legalMoves.push(newSquare)
                                }
                            }
                        }
                    }
                }
                if (move === 8) {
                    if (!squareIsOccupied(board, newSquare)) {
                        if (!isKingInCheck(board, index, newSquare, piece)) {
                            legalMoves.push(newSquare)
                        }
                    }
                }
                if (move === 16) {
                    if (!piece.moved) {
                        if (!squareIsOccupied(board, newSquare)) {
                            if (!isKingInCheck(board, index, newSquare, piece)) {
                                legalMoves.push(newSquare)
                            }
                        }
                    }
                }
            }
        } else {
            let newSquare = index - move
            if (squareIsOnBoard(newSquare)) {
                if (move === 7 || move === 9) {
                    if (squareIsOccupied(board, newSquare)) {
                        if (squareCanBeAttacked(board, newSquare, piece)) {
                            if (isOnSameDiagonal(index, newSquare)) {
                                if (!isKingInCheck(board, index, newSquare, piece)) {
                                    legalMoves.push(newSquare)
                                }
                            }
                        }
                    }
                }
                if (move === 8) {
                    if (!squareIsOccupied(board, newSquare)) {
                        if (!isKingInCheck(board, index, newSquare, piece)) {
                            legalMoves.push(newSquare)
                        }
                    }
                }
                if (move === 16) {
                    if (!piece.moved) {
                        if (!squareIsOccupied(board, newSquare)) {
                            if (!isKingInCheck(board, index, newSquare, piece)) {
                                legalMoves.push(newSquare)
                            }
                        }
                    }
                }
            }
        }
    }

    return legalMoves;
}