export default function checkLegalMoves(board, key) {
    const {piece, index} = board.filter((square, index) => square.id === key)[0]
    const legalMoves = []
    let possibleMoves = []
    let movesToCheckUp = []
    let movesToCheckDown = []
    switch (piece.type) {
        case "Pawn":
            possibleMoves = [7, 8, 9]
            if (piece.colour === "White") {
                let movesToCheck = []
                for (let move of possibleMoves) {
                    if (index + move >= 0 && index + move <= 63) {
                        movesToCheck.push(move)
                    }
                }
                if (movesToCheck.includes(7)) {
                    if (board[index + 7].piece.type && board[index + 7].piece.colour !== piece.colour) {
                        legalMoves.push(index + 7)
                    } 
                }
                if (movesToCheck.includes(8)) {
                    if (!board[index + 8].piece.type) {
                        legalMoves.push(index + 8)
                    }
                }
                if (movesToCheck.includes(9)) {
                    if (board[index + 9].piece.type && board[index + 9].piece.colour !== piece.colour) {
                        legalMoves.push(index + 9)
                    }
                }
                if (!piece.moved) {
                    if (!board[index + 16].piece.type) {
                        legalMoves.push(index + 16)
                    }
                }
            } else {
                let movesToCheck = []
                for (let move of possibleMoves) {
                    if (index - move >= 0 && index - move <= 63) {
                        movesToCheck.push(move)
                    }
                }
                if (movesToCheck.includes(7)) {
                    if (board[index - 7].piece.type && board[index - 7].piece.colour !== piece.colour) {
                        legalMoves.push(index - 7)
                    }
                }
                if (movesToCheck.includes(8)) {
                    if (!board[index - 8].piece.type) {
                        legalMoves.push(index - 8)
                    }
                }
                if (movesToCheck.includes(9)) {
                    if (board[index - 9].piece.type && board[index - 9].piece.colour !== piece.colour) {
                        legalMoves.push(index - 9)
                    }
                }
                if (!piece.moved) {
                    if (!board[index - 16].piece.type) {
                        legalMoves.push(index - 16)
                    }
                }
            }
            return legalMoves;
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
        case "Rook":
            let possibleRowMoves = [1, 2, 3, 4, 5, 6, 7]
            for (let move of possibleRowMoves) {
                if (index + move >= 0 && index + move <= 63) {
                    if (index % 8 < index + move % 8) {
                        movesToCheckUp.push(move)
                    }
                }
            }
            for (let move of possibleRowMoves) {
                if (index - move >= 0 && index - move <= 63) {
                    if (index % 8 > index - move % 8) {
                        movesToCheckDown.push(move)
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