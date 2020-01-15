import {squareIsOnBoard, isOnSameDiagonal, squareIsOccupied} from '../common'

export default function bishopMoves(board, index, piece) {
    const possibleMovesLeft = [7, 14, 21, 28, 35, 42, 49]
    const possibleMovesRight = [9, 18, 27, 36, 45, 54, 63]
    const legalThreats = []
    for (let move of possibleMovesLeft) {
        let newSquare = index + move
        if (squareIsOnBoard(newSquare)) {
            if (isOnSameDiagonal(index, newSquare)) {
                if (squareIsOccupied(board, newSquare)) {
                    legalThreats.push(newSquare)
                    break
                }
                legalThreats.push(newSquare)
            }
        }
    }
    for (let move of possibleMovesLeft) {
        let newSquare = index - move
        if (squareIsOnBoard(newSquare)) {
            if (isOnSameDiagonal(index, newSquare)) {
                if (squareIsOccupied(board, newSquare)) {
                    legalThreats.push(newSquare)
                    break
                }
                legalThreats.push(newSquare)
            }
        }
    }
    for (let move of possibleMovesRight) {
        let newSquare = index + move
        if (squareIsOnBoard(newSquare)) {
            if (isOnSameDiagonal(index, newSquare)) {
                if (squareIsOccupied(board, newSquare)) {
                    legalThreats.push(newSquare)
                    break
                }
                legalThreats.push(newSquare)
            }
        }
    }
    for (let move of possibleMovesRight) {
        let newSquare = index - move
        if (squareIsOnBoard(newSquare)) {
            if (isOnSameDiagonal(index, newSquare)) {
                if (squareIsOccupied(board, newSquare)) {
                    legalThreats.push(newSquare)
                    break
                }
                legalThreats.push(newSquare)
            }
        }
    }
    return legalThreats;
}
