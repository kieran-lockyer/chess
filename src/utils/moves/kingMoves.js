import {squareIsOnBoard, squareCanBeAttacked, squareIsOccupied, isOnSameRow, isOnSameDiagonal, isKingInCheck} from '../common'

export default function kingMoves(board, index, piece, threats = false) {
    const possibleMoves = [1, 7, 8, 9]
    const legalMoves = []
    for (let move of possibleMoves) {
        let newSquare = index + move
        if (squareIsOnBoard(newSquare)) {
            if (squareCanBeAttacked(board, newSquare, piece)) {
                if (move === 1) {
                    if (isOnSameRow(index, newSquare)) {
                        if (!isKingInCheck(board, index, newSquare, piece)) {
                            legalMoves.push(newSquare)
                        }
                    }
                }
                if (move === 7 || move === 9) {
                    if (isOnSameDiagonal(index, newSquare)) {
                        if (!isKingInCheck(board, index, newSquare, piece)) {
                            legalMoves.push(newSquare)
                        }
                    }
                }
                if (move === 8) {
                    if (!isKingInCheck(board, index, newSquare, piece)) {
                        legalMoves.push(newSquare)
                    }
                }
            }
        }
    }
    for (let move of possibleMoves) {
        let newSquare = index - move
        if (squareIsOnBoard(newSquare)) {
            if (squareCanBeAttacked(board, newSquare, piece)) {
                if (move === 1) {
                    if (isOnSameRow(index, newSquare)) {
                        if (!isKingInCheck(board, index, newSquare, piece)) {
                            legalMoves.push(newSquare)
                        }
                    }
                } 
                if (move === 7 || move === 9) {
                    if (isOnSameDiagonal(index, newSquare)) {
                        if (!isKingInCheck(board, index, newSquare, piece)) {
                            legalMoves.push(newSquare)
                        }
                    }
                }
                if (move === 8) {
                    if (!isKingInCheck(board, index, newSquare, piece)) {
                        legalMoves.push(newSquare)
                    }
                }
            }
        }
    }
    if (threats) {
        if (!piece.moved) {
            if (piece.colour === "White") {
                const a1RookCanCaslte = board[0].piece && board[0].piece.type === "Rook" && !board[0].piece.moved
                const h1RookCanCastle = board[7].piece && board[7].piece.type === "Rook" && !board[7].piece.moved
                if (a1RookCanCaslte) {
                    if (!squareIsOccupied(board, index - 1) && !squareIsOccupied(board, index - 2)) {
                        if (!threats.black.includes(index - 1) && !threats.black.includes(index - 2)) {
                            legalMoves.push(index - 2)
                        }
                    }
                }
                if (h1RookCanCastle) {
                    if (!squareIsOccupied(board, index + 1) && !squareIsOccupied(board, index + 2)) {
                        if (!threats.black.includes(index + 1) && !threats.black.includes(index + 2)) {
                            legalMoves.push(index + 2)
                        }
                    }
                }
            } else {
                const a8RookCanCaslte = board[56].piece && board[56].piece.type === "Rook" && !board[56].piece.moved
                const h8RookCanCastle = board[63].piece && board[63].piece.type === "Rook" && !board[63].piece.moved
                if (a8RookCanCaslte) {
                    if (!squareIsOccupied(board, index - 1) && !squareIsOccupied(board, index - 2)) {
                        if (!threats.white.includes(index - 1) && !threats.white.includes(index - 2)) {
                            legalMoves.push(index - 2)
                        }
                    }
                }
                if (h8RookCanCastle) {
                    if (!squareIsOccupied(board, index + 1) && !squareIsOccupied(board, index + 2)) {
                        if (!threats.white.includes(index + 1) && !threats.white.includes(index + 2)) {
                            legalMoves.push(index + 2)
                        }
                    }
                }
            }
        }
    }
    return legalMoves;
}