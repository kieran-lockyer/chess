import pawnMoves from './moves/pawnMoves'

export default function checkLegalMoves(board, key) {
    const {piece, index} = board.filter(square => square.id === key)[0]
    const legalMoves = []
    let possibleMoves = []
    let movesToCheckUp = []
    let movesToCheckDown = []
    let movesToCheckLeft = []
    let movesToCheckRight = []
    switch (piece.type) {
        case "Pawn":
            return pawnMoves(board, index, piece);
        case "Knight":
            possibleMoves = [6, 10, 15, 17]
            for (let move of possibleMoves) {
                if (index + move >= 0 && index + move <= 63) {
                    movesToCheckUp.push(move)
                }
            }
            for (let move of possibleMoves) {
                if (index - move >= 0 && index - move <= 63) {
                    movesToCheckDown.push(move)
                }
            }
            for (let move of movesToCheckUp) {
                if (board[index + move].piece.colour !== piece.colour) {
                    legalMoves.push(index + move)
                }
            }
            for (let move of movesToCheckDown) {
                if (board[index - move].piece.colour !== piece.colour) {
                    legalMoves.push(index - move)
                }
            }
            return legalMoves;
        case "Bishop":
            possibleMoves = [7, 9, 14, 18, 21, 27, 28, 35, 36, 42, 45, 49, 54, 56, 63]
            for (let move of possibleMoves) {
                if (index + move >= 0 && index + move <= 63) {
                    movesToCheckUp.push(move)
                }
            }
            for (let move of possibleMoves) {
                if (index - move >= 0 && index - move <= 63) {
                    movesToCheckDown.push(move)
                }
            }
            for (let move of movesToCheckUp) {
                if (board[index + move].piece.type) {
                    if (board[index + move].piece.colour !== piece.colour) {
                        legalMoves.push(index + move)
                        break
                    } else {
                        break
                    }
                }
            }
            for (let move of movesToCheckDown) {
                if (board[index - move].piece.type) {
                    if (board[index - move].piece.colour !== piece.colour) {
                        legalMoves.push(index - move)
                        break
                    } else {
                        break
                    }
                }
            }
            return legalMoves;
        case "Rook":
            let possibleRowMoves = [1, 2, 3, 4, 5, 6, 7]
            for (let move of possibleRowMoves) {
                if (index + move >= 0 && index + move <= 63) {
                    if (index % 8 < index + move % 8) {
                        movesToCheckRight.push(move)
                    }
                }
            }
            for (let move of possibleRowMoves) {
                if (index - move >= 0 && index - move <= 63) {
                    if (index % 8 > index - move % 8) {
                        movesToCheckLeft.push(move)
                    }
                }
            }
            let possibleColumnMoves = [8, 16, 24, 32, 40, 48, 56]
            for (let move of possibleColumnMoves) {
                if (index + move >= 0 && index + move <= 63) {
                    movesToCheckUp.push(move)
                }
            }
            for (let move of possibleColumnMoves) {
                if (index - move >= 0 && index - move <= 63) {
                    movesToCheckDown.push(move)
                }
            }
            for (let move of movesToCheckRight) {
                if (board[index + move].piece.type) {
                    if (board[index + move].piece.colour !== piece.colour) {
                        legalMoves.push(index + move)
                        break
                    } else {
                        break
                    }
                }
            }
            for (let move of movesToCheckLeft) {
                if (board[index - move].piece.type) {
                    if (board[index - move].piece.colour !== piece.colour) {
                        legalMoves.push(index - move)
                        break
                    } else {
                        break
                    }
                }
            }
            for (let move of movesToCheckUp) {
                if (board[index + move].piece.type) {
                    if (board[index + move].piece.colour !== piece.colour) {
                        legalMoves.push(index + move)
                        break
                    } else {
                        break
                    }
                }
            }
            for (let move of movesToCheckDown) {
                if (board[index - move].piece.type) {
                    if (board[index - move].piece.colour !== piece.colour) {
                        legalMoves.push(index - move)
                        break
                    } else {
                        break
                    }
                }
            }
            return legalMoves;
        case "Queen":
            possibleMoves = [1, 2, 3, 4, 5, 6, 7, 8, 16, 24, 32, 40, 48, 56, 9, 14, 18, 21, 27, 28, 35, 36, 42, 45, 49, 54, 56, 63]
            for (let move of possibleMoves) {
                if (index + move >= 0 && index + move <= 63) {
                    movesToCheckUp.push(move)
                }
            }
            for (let move of possibleMoves) {
                if (index - move >= 0 && index - move <= 63) {
                    movesToCheckDown.push(move)
                }
            }
            for (let move of movesToCheckUp) {
                if (board[index + move].piece.colour !== piece.colour) {
                    legalMoves.push(index + move)
                } else {
                    break
                }
            }
            for (let move of movesToCheckDown) {
                if (board[index - move].piece.colour !== piece.colour) {
                    legalMoves.push(index - move)
                } else {
                    break
                }
            }
            return legalMoves;
        case "King":
            possibleMoves = [1, 7, 8, 9]
            for (let move of possibleMoves) {
                if (index + move >= 0 && index + move <= 63) {
                    movesToCheckUp.push(move)
                }
            }
            for (let move of possibleMoves) {
                if (index - move >= 0 && index - move <= 63) {
                    movesToCheckDown.push(move)
                }
            }
            for (let move of movesToCheckUp) {
                if (board[index + move].piece.colour !== piece.colour) {
                    legalMoves.push(index + move)
                }
            }
            for (let move of movesToCheckDown) {
                if (board[index - move].piece.colour !== piece.colour) {
                    legalMoves.push(index - move)
                }
            }
            return legalMoves;
        default:
            return legalMoves;
    }
}