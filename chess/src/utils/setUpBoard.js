export default function setUpBoard() {
    console.log('running setUpBoard')
    const files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']
    let newBoard = Array.apply(null, Array(64))
    let rank = 1
    let file = 0

    newBoard.forEach((square, square_index) => {
        let id = files[file] + rank.toString()
        if (file === 7) {
            file = -1
            rank++
        }
        file++

        let square_contents = {
            id,
            piece: {}
        }

        if (square_index >= 8 && square_index <= 15) {
            square_contents.piece = {
                type: "Pawn",
                colour: "White"
            }
        }
        if (square_index >= 48 && square_index <= 55) {
            square_contents.piece = {
                type: "Pawn",
                colour: "Black"
            }
        }
        if (square_index === 0 || square_index === 7) {
            square_contents.piece = {
                type: "Rook",
                colour: "White"
            }
        }
        if (square_index === 56 || square_index === 63) {
            square_contents.piece = {
                type: "Rook",
                colour: "Black"
            }
        }
        if (square_index === 1 || square_index === 6) {
            square_contents.piece = {
                type: "Knight",
                colour: "White"
            }
        }
        if (square_index === 57 || square_index === 62) {
            square_contents.piece = {
                type: "Knight",
                colour: "Black"
            }
        }
        if (square_index === 2 || square_index === 5) {
            square_contents.piece = {
                type: "Bishop",
                colour: "White"
            }
        }
        if (square_index === 58 || square_index === 61) {
            square_contents.piece = {
                type: "Bishop",
                colour: "Black"
            }
        }
        if (square_index === 3) {
            square_contents.piece = {
                type: "Queen",
                colour: "White"
            }
        }
        if (square_index === 59) {
            square_contents.piece = {
                type: "Queen",
                colour: "Black"
            }
        }
        if (square_index === 4) {
            square_contents.piece = {
                type: "King",
                colour: "White"
            }
        }
        if (square_index === 60) {
            square_contents.piece = {
                type: "King",
                colour: "Black"
            }
        }
        newBoard[square_index] = square_contents
    })
    
    return newBoard
}