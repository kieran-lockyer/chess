export const squareIsOnBoard = (index) => {
    return index >= 0 && index <= 63
}

export const squareIsOccupied = (board, index) => {
    return JSON.stringify(board[index].piece) !== JSON.stringify({}) 
}

export const squareCanBeAttacked = (board, index, piece) => {
    return board[index].piece.type ? board[index].piece.colour !== piece.colour : true
}

const ROWS = []
for (let n = 0; n < 8; n++) {
    let row = []
    for (let i = 0; i < 8; i++) {
        row.push(i + n * 8)
    }
    ROWS.push(row)
}

const COLUMNS = []
for (let n = 0; n < 8; n++) {
    let col = []
    for (let i = 0; i < 8; i++) {
        col.push(n + i * 8)
    }
    COLUMNS.push(col)
}

const UPRIGHT = [ 
    [  0,  9, 18, 27, 36, 45, 54, 63 ],
    [  1, 10, 19, 28, 37, 46, 55 ],
    [  2, 11, 20, 29, 38, 47 ],
    [  3, 12, 21, 30, 39 ],
    [  4, 13, 22, 31 ],
    [  5, 14, 23 ],
    [  6, 15 ],
    [  7 ],
    [  8, 17, 26, 35, 44, 53, 62 ],
    [ 16, 25, 34, 43, 52, 61 ],
    [ 24, 33, 42, 51, 60 ],
    [ 32, 41, 50, 59 ],
    [ 40, 49, 58],
    [ 48, 57],
    [ 56 ]
]

const UPLEFT = [ 
    [  7, 14, 21, 28, 35, 42, 49, 56 ],
    [  6, 13, 20, 27, 34, 41, 48 ],
    [  5, 12, 19, 26, 33, 40 ],
    [  4, 11, 18, 25, 32 ],
    [  3, 10, 17, 24 ],
    [  2,  9, 16 ],
    [  1,  8 ],
    [  0 ],
    [ 15, 22, 29, 36, 43, 50, 57 ],
    [ 23, 30, 37, 44, 51, 58 ],
    [ 31, 38, 45, 52, 59 ],
    [ 39, 46, 53, 60 ],
    [ 47, 54, 61 ],
    [ 55, 62 ],
    [ 63 ]
]

export const isOnSameRow = (startSquare, endSquare) => {
    for (let row of ROWS) {
        if (row.includes(startSquare)) {
            return row.includes(endSquare)
        }
    }
}

export const isOnSameColumn = (startSquare, endSquare) => {
    for (let col of COLUMNS) {
        if (col.includes(startSquare)) {
            return col.includes(endSquare)
        }
    }
}

export const isOnSameDiagonal = (startSquare, endSquare) => {
    let sameDiag = false
    for (let diag of UPRIGHT) {
        if (diag.includes(startSquare)) {
            sameDiag = diag.includes(endSquare)
        }
    }
    if (!sameDiag) {
        for (let diag of UPLEFT) {
            if (diag.includes(startSquare)) {
                sameDiag = diag.includes(endSquare)
            }
        }
    }
    return sameDiag
}