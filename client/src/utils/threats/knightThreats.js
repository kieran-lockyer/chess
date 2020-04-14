import {squareIsOnBoard, isOnSameRow, isOnSameColumn} from '../common'

export default function knightMoves(board, index, piece) {
    const possibleMoves = [6, 10, 15, 17]
    const legalThreats = []
    for (let move of possibleMoves) {
        let newSquare = index + move
        if (squareIsOnBoard(newSquare)) {
            if (move === 6){
                if (isOnSameRow(index, index - 2)) {
                    if (isOnSameColumn(index - 2, newSquare)) {
                        legalThreats.push(newSquare)
                    }
                }
            } 
            if (move === 10) {
                if (isOnSameRow(index, index + 2)) {
                    if (isOnSameColumn(index + 2, newSquare)) {
                        legalThreats.push(newSquare)
                    }
                }
            }
            if (move === 15){
                if (isOnSameRow(index, index - 1)) {
                    if (isOnSameColumn(index - 1, newSquare)) {
                        legalThreats.push(newSquare)
                    }
                }
            } 
            if (move === 17) {
                if (isOnSameRow(index, index + 1)) {
                    if (isOnSameColumn(index + 1, newSquare)) {
                        legalThreats.push(newSquare)
                    }
                }
            }
        }
    }
    for (let move of possibleMoves) {
        let newSquare = index - move
        if (squareIsOnBoard(newSquare)) {
            if (move === 6){
                if (isOnSameRow(index, index + 2)) {
                    if (isOnSameColumn(index + 2, newSquare)) {
                        legalThreats.push(newSquare)
                    }
                }
            } 
            if (move === 10) {
                if (isOnSameRow(index, index - 2)) {
                    if (isOnSameColumn(index - 2, newSquare)) {
                        legalThreats.push(newSquare)
                    }
                }
            }
            if (move === 15){
                if (isOnSameRow(index, index + 1)) {
                    if (isOnSameColumn(index + 1, newSquare)) {
                        legalThreats.push(newSquare)
                    }
                }
            } 
            if (move === 17) {
                if (isOnSameRow(index, index - 1)) {
                    if (isOnSameColumn(index - 1, newSquare)) {
                        legalThreats.push(newSquare)
                    }
                }
            }
        }
    }
    return legalThreats;
}