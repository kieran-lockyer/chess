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
                    if (index >= 32 && index <= 39) {
                        if (index === 32) {
                            if (move === 9) {
                                let pieceToRight = board[index + 1].piece
                                if (pieceToRight.type && pieceToRight.type === "Pawn" && pieceToRight.colour === "Black" && pieceToRight.enpassant) {
                                    legalMoves.push(newSquare)
                                }
                            }
                        } else if (index === 39) {
                            if (move === 7) {
                                let pieceToLeft = board[index - 1].piece
                                if (pieceToLeft.type && pieceToLeft.type === "Pawn" && pieceToLeft.colour === "Black" && pieceToLeft.enpassant) {
                                    legalMoves.push(newSquare)
                                }
                            }
                        } else {
                            if (move === 9) {
                                let pieceToRight = board[index + 1].piece
                                if (pieceToRight.type && pieceToRight.type === "Pawn" && pieceToRight.colour === "Black" && pieceToRight.enpassant) {
                                    legalMoves.push(newSquare)
                                }
                            }
                            if (move === 7) {
                                let pieceToLeft = board[index - 1].piece
                                if (pieceToLeft.type && pieceToLeft.type === "Pawn" && pieceToLeft.colour === "Black" && pieceToLeft.enpassant) {
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
                    if (index >= 24 && index <= 31) {
                        if (index === 24) {
                            if (move === 9) {
                                let pieceToRight = board[index - 1].piece
                                if (pieceToRight.type && pieceToRight.type === "Pawn" && pieceToRight.colour === "White" && pieceToRight.enpassant) {
                                    legalMoves.push(newSquare)
                                }
                            }
                        } else if (index === 31) {
                            if (move === 7) {
                                let pieceToLeft = board[index + 1].piece
                                if (pieceToLeft.type && pieceToLeft.type === "Pawn" && pieceToLeft.colour === "White" && pieceToLeft.enpassant) {
                                    legalMoves.push(newSquare)
                                }
                            }
                        } else {
                            if (move === 9) {
                                let pieceToRight = board[index - 1].piece
                                if (pieceToRight.type && pieceToRight.type === "Pawn" && pieceToRight.colour === "White" && pieceToRight.enpassant) {
                                    legalMoves.push(newSquare)
                                }
                            }
                            if (move === 7) {
                                let pieceToLeft = board[index + 1].piece
                                if (pieceToLeft.type && pieceToLeft.type === "Pawn" && pieceToLeft.colour === "White" && pieceToLeft.enpassant) {
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