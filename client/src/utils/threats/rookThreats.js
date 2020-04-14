import {squareIsOnBoard, isOnSameRow, isOnSameColumn, squareIsOccupied} from '../common'

export default function rookMoves(board, index, piece) {
    const possibleRowMoves = [1, 2, 3, 4, 5, 6, 7]
    const possibleColumnMoves = [8, 16, 24, 32, 40, 48, 56]
    const legalThreats = []
    for (let move of possibleRowMoves) {
        let newSquare = index + move
        if (squareIsOnBoard(newSquare)) {
            if (isOnSameRow(index, newSquare)) {
                if (squareIsOccupied(board, newSquare)) {
                    legalThreats.push(newSquare)
                    break
                }
                legalThreats.push(newSquare)
            }
        }
    }
    for (let move of possibleRowMoves) {
        let newSquare = index - move
        if (squareIsOnBoard(newSquare)) {
            if (isOnSameRow(index, newSquare)) {
                if (squareIsOccupied(board, newSquare)) {
                    legalThreats.push(newSquare)
                    break
                }
                legalThreats.push(newSquare)
            }
        }
    }
    for (let move of possibleColumnMoves) {
        let newSquare = index + move
        if (squareIsOnBoard(newSquare)) {
            if (isOnSameColumn(index, newSquare)) {
                if (squareIsOccupied(board, newSquare)) {
                    legalThreats.push(newSquare)
                    break
                }
                legalThreats.push(newSquare)
            }
        }
    }
    for (let move of possibleColumnMoves) {
        let newSquare = index - move
        if (squareIsOnBoard(newSquare)) {
            if (isOnSameColumn(index, newSquare)) {
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
