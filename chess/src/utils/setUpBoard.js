export default function setUpBoard() {
    console.log('running setUpBoard')
    const files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']
    let newBoard = Array.apply(null, Array(64))
    let rank = 1
    let file = 0

    newBoard.forEach((square, index) => {
        let id = files[file] + rank.toString()
        if (file === 7) {
            file = -1
            rank++
        }
        file++

        let square_contents = {
            id,
            index: index,
            piece: {}
        }

        if (index >= 8 && index <= 15) {
            square_contents.piece = {
                type: "Pawn",
                colour: "White",
                moved: false
            }
        }
        if (index >= 48 && index <= 55) {
            square_contents.piece = {
                type: "Pawn",
                colour: "Black",
                moved: false
            }
        }
        if (index === 0 || index === 7) {
            square_contents.piece = {
                type: "Rook",
                colour: "White",
                moved: false
            }
        }
        if (index === 56 || index === 63) {
            square_contents.piece = {
                type: "Rook",
                colour: "Black",
                moved: false
            }
        }
        if (index === 1 || index === 6) {
            square_contents.piece = {
                type: "Knight",
                colour: "White"
            }
        }
        if (index === 57 || index === 62) {
            square_contents.piece = {
                type: "Knight",
                colour: "Black"
            }
        }
        if (index === 2 || index === 5) {
            square_contents.piece = {
                type: "Bishop",
                colour: "White"
            }
        }
        if (index === 58 || index === 61) {
            square_contents.piece = {
                type: "Bishop",
                colour: "Black"
            }
        }
        if (index === 3) {
            square_contents.piece = {
                type: "Queen",
                colour: "White"
            }
        }
        if (index === 59) {
            square_contents.piece = {
                type: "Queen",
                colour: "Black"
            }
        }
        if (index === 4) {
            square_contents.piece = {
                type: "King",
                colour: "White",
                moved: false
            }
        }
        if (index === 60) {
            square_contents.piece = {
                type: "King",
                colour: "Black",
                moved: false
            }
        }
        newBoard[index] = square_contents
    })
    
    return newBoard
}