import React, {useState, useEffect} from 'react'
import Square from './Square'
import Piece from './Piece'
import setUpBoard from './utils/setUpBoard'
import './Board.css'


export default function Board() {
    const [board, setBoard] = useState([])
    const [dimensions, setDimensions] = useState(80)
    const [source, setSource] = useState('')
    const [turn, setTurn] = useState('White')
    
    useEffect(() => {
        console.log('running useEffect')
        setBoard(setUpBoard())
    },
    [])

    const selectSquare = (s) => {
        console.log(s.id, 'selected')
        if (source) {
            movePiece(source, s.id)
        } else {
            if (turn === s.piece.colour) {
                let newBoard = JSON.parse(JSON.stringify(board))
                newBoard.map(square => {
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
            setSource('')
            return
        }

        const sourceSquare = newBoard.filter(square => square.id === source)[0]
        newBoard.map(square => {
            if (square.id === destination) {
                square.piece = sourceSquare.piece
                square.selected = true
            }
            return square
        })
        newBoard.map(square => {
            if (square.id === source) {
                square.piece = {}
                square.selected = true
            }
            return square
        })
        setBoard(newBoard)
        setSource('')
        setTurn(turn === "White" ? "Black" : "White")
    }

    let swap = true
    
    return (
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
                        selected={s.selected}
                    >
                        {s.piece.type && <Piece piece={s.piece.colour + s.piece.type} />}
                    </Square>
                )
            })}
        </div>
    )
}
