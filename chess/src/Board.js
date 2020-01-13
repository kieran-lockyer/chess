import React, {useState, useEffect} from 'react'
import Square from './Square'
import Piece from './Piece'
import PieceSidePanel from './PieceSidePanel'
import setUpBoard from './utils/setUpBoard'
import checkLegalMoves from './utils/checkLegalMoves'
import './Board.css'


export default function Board() {
    const [board, setBoard] = useState([])
    const [dimensions, setDimensions] = useState(80)
    const [source, setSource] = useState('')
    const [turn, setTurn] = useState('White')
    const [placeMode, setPlaceMode] = useState({})
    
    useEffect(() => {
        setBoard(setUpBoard())
    },
    [])

    const clearBoard = () => {
        let newBoard = JSON.parse(JSON.stringify(board))
        newBoard.map(square => {
            square.piece = {}
            square.highlight = false
            square.selected = false
        })
        setBoard(newBoard)
    }

    const selectSquare = (s) => {
        console.log(s.id, 'selected')
        if (source) {
            movePiece(source, s.id)
        } else {
            if (turn === s.piece.colour) {
                let newBoard = JSON.parse(JSON.stringify(board))
                const legalMoves = checkLegalMoves(newBoard, s.id)
                console.log('legalMoves', legalMoves)
                newBoard.map(square => {
                    if (legalMoves.includes(square.index)) {
                        square.highlight = true
                    }
                    if (square.selected) {
                        square.selected = false
                    }
                    if (square.id === s.id) {
                        square.selected = true
                    }
                    return square
                })
                if (s.piece.type) {
                    console.log('setting source to', s.id)
                    setSource(s.id)
                }
                setBoard(newBoard)
            }
        }
    }
    
    const movePiece = (source, destination) => {
        let newBoard = JSON.parse(JSON.stringify(board))

        if (source === destination) {
            newBoard.map(square => {
                if (square.highlight) {
                    square.highlight = false
                }
                if (square.selected) {
                    square.selected = false
                }
                return square
            })
            console.log('bailing, same piece selected twice')
            setBoard(newBoard)
            setSource('')
            return
        }

        const sourceSquare = newBoard.filter(square => square.id === source)[0]
        const destinationSquare = newBoard.filter(square => square.id === destination)[0]

        const legalMoves = checkLegalMoves(newBoard, source)

        if (legalMoves.includes(destinationSquare.index)) {
            newBoard.map(square => {
                if (square.id === destination) {
                    square.piece = sourceSquare.piece
                    square.selected = true
                    if (square.piece.type === "Pawn" && !square.piece.moved) {
                        square.piece.moved = true
                    }
                    if (square.piece.type === "Rook" && !square.piece.moved) {
                        square.piece.moved = true
                    }
                    if (square.piece.type === "King" && !square.piece.moved) {
                        square.piece.moved = true
                    }
                }
                return square
            })
            newBoard.map(square => {
                if (square.id === source) {
                    square.piece = {}
                    square.selected = true
                }
                if (square.highlight) {
                    square.highlight = false
                }
                return square
            })
            setBoard(newBoard)
            setSource('')
            setTurn(turn === "White" ? "Black" : "White")
        }
    }

    const selectPiece = (piece) => {
        console.log(piece, 'selected')
        setPlaceMode(piece)
    }

    const placePiece = (id) => {
        console.log('placing piece at', id)
        let newBoard = JSON.parse(JSON.stringify(board))
        newBoard.map(square => {
            if (square.id === id) {
                square.piece = placeMode
            }
            return square
        })

        setBoard(newBoard)
        setPlaceMode({})
    }

    let swap = true
    return (
        <div style={{display: 'flex', justifyContent: 'space-around', alignItems: 'center'}}>
            <div className="Board" style={{maxWidth: dimensions * 8}}>
                {board.map((s, s_idx) => {
                    if (s_idx % 8 === 0) {
                        swap = !swap
                    }
                    let squareColour = !swap ? s_idx % 2 === 0 ? "Black" : "White" : s_idx % 2 === 0 ? "White" : "Black"

                    return (
                        <Square 
                            key={`sqaure${s_idx}`} 
                            id={s.id} 
                            dimensions={`${dimensions}px`} 
                            squareColour={squareColour}
                            selectSquare={() => selectSquare(s)}
                            placeMode={placeMode}
                            placePiece={placePiece}
                            selected={s.selected}
                            highlight={s.highlight}
                        >
                            {s.piece.type && <Piece piece={s.piece.colour + s.piece.type} />}
                        </Square>
                    )
                })}
            </div>
            <div className="side-panel" style={{marginLeft: '100px', marginRight: 'auto'}}>
                <PieceSidePanel selectPiece={selectPiece}/>
                <button onClick={clearBoard}>Clear Board</button>
            </div>
        </div>
    )
}
