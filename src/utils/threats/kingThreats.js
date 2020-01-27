import {squareIsOnBoard, isOnSameRow, isOnSameDiagonal} from '../common'

export default function kingMoves(board, index, piece, threats = false) {
    const possibleMoves = [1, 7, 8, 9]
    const legalThreats = []
    for (let move of possibleMoves) {
        let newSquare = index + move
        if (squareIsOnBoard(newSquare)) {
            if (move === 1) {
                if (isOnSameRow(index, newSquare)) {
                    legalThreats.push(newSquare)
                }
            }
            if (move === 7 || move === 9) {
                if (isOnSameDiagonal(index, newSquare)) {
                    legalThreats.push(newSquare)
                }
            }
            if (move === 8) {
                legalThreats.push(newSquare)
            }
        }
    }
    for (let move of possibleMoves) {
        let newSquare = index - move
        if (squareIsOnBoard(newSquare)) {
            if (move === 1) {
                if (isOnSameRow(index, newSquare)) {
                    legalThreats.push(newSquare)
                }
            } 
            if (move === 7 || move === 9) {
                if (isOnSameDiagonal(index, newSquare)) {
                    legalThreats.push(newSquare)
                }
            }
            if (move === 8) {
                legalThreats.push(newSquare)
            }
        }
    }
    return legalThreats;
}