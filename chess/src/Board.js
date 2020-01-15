import React, {useState, useEffect} from 'react'
import Square from './Square'
import Piece from './Piece'
import PieceSidePanel from './PieceSidePanel'
import setUpBoard from './utils/setUpBoard'
import checkLegalMoves from './utils/checkLegalMoves'
import checkThreats from './utils/checkThreats'
import {isKingInCheck} from './utils/common'
import './Board.css'


export default function Board() {
    const [board, setBoard] = useState([])
    const [legalMoves, setLegalMoves] = useState({white: [], black: []})
    const [threats, setThreats] = useState({white: [], black: []})
    const [dimensions, setDimensions] = useState(80)
    const [source, setSource] = useState('')
    const [turn, setTurn] = useState('White')
    const [placeMode, setPlaceMode] = useState({})
    const [gameState, setGameState] = useState('running')
    
    useEffect(() => {
        setBoard(setUpBoard())
    }, [])

    useEffect(() => {
        const newThreats = {white: [], black: []}
        const newLegalMoves = {white: [], black: []}
        if (board.length) {
            newThreats.white = checkThreats(board, "White")
            newThreats.black = checkThreats(board, "Black")
            for (let square of board) {
                if (square.piece.type) {
                    if (square.piece.colour === "White") {
                        Array.prototype.push.apply(newLegalMoves.white, checkLegalMoves(board, square.index, newThreats))
                    } else {
                        Array.prototype.push.apply(newLegalMoves.black, checkLegalMoves(board, square.index, newThreats))
                    }
                }
            }
        }
        setThreats(newThreats)
        setLegalMoves(newLegalMoves)
        if (newLegalMoves[turn.toLowerCase()].length === 0) {
            for (let square of board) {
                if (square.piece.type) {
                    if (square.piece.type === "King") {
                        if (square.piece.colour === turn) {
                            if (isKingInCheck(board, square.index, square.index, square.piece)) {
                                setGameState('checkmate')
                            } else {
                                setGameState('stalemate')
                            }
                        }
                    }
                }
            }
        }
    }, [board])

    const clearBoard = () => {
        let newBoard = JSON.parse(JSON.stringify(board))
        newBoard.map(square => {
            square.piece = {}
            square.highlight = false
            square.selected = false
            return square
        })
        setBoard(newBoard)
    }

    const selectSquare = (s) => {
        console.log(s.id, 'selected')
        if (source !== '') {
            movePiece(source, s.index)
        } else {
            if (turn === s.piece.colour) {
                let newBoard = JSON.parse(JSON.stringify(board))
                const legalMoves = checkLegalMoves(newBoard, s.index, threats)
                newBoard.map(square => {
                    if (legalMoves.includes(square.index)) {
                        square.highlight = true
                    }
                    if (square.selected) {
                        square.selected = false
                    }
                    if (square.index === s.index) {
                        square.selected = true
                    }
                    return square
                })
                if (s.piece.type) {
                    console.log('setting source to', s.index)
                    setSource(s.index)
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
            setBoard(newBoard)
            setSource('')
            return
        }

        const legalMoves = checkLegalMoves(newBoard, source, threats)
        if (legalMoves.includes(destination)) {
            console.log(destination, legalMoves)
            if (newBoard[source].piece.type === "King" && !newBoard[source].piece.moved) {
                if (newBoard[source].piece.colour === "White") {
                    if (destination === 2) {
                        newBoard[3].piece = newBoard[0].piece
                        newBoard[0].piece = {}
                        newBoard[3].selected = true
                        newBoard[0].selected = true
                        newBoard[3].moved = true
                    }
                    if (destination === 6) {
                        newBoard[5].piece = newBoard[7].piece
                        newBoard[7].piece = {}
                        newBoard[5].selected = true
                        newBoard[7].selected = true
                        newBoard[5].moved = true
                    }
                } else {
                    if (destination=== 58) {
                        newBoard[59].piece = newBoard[56].piece
                        newBoard[56].piece = {}
                        newBoard[59].selected = true
                        newBoard[56].selected = true
                        newBoard[59].moved = true
                    }
                    if (destination === 62) {
                        newBoard[61].piece = newBoard[63].piece
                        newBoard[63].piece = {}
                        newBoard[61].selected = true
                        newBoard[63].selected = true
                        newBoard[61].moved = true
                    }
                }
            }
            newBoard[destination].piece = newBoard[source].piece
            newBoard[destination].selected = true
            if (newBoard[destination].piece.type === "Pawn" && !newBoard[destination].piece.moved) {
                newBoard[destination].piece.moved = true
            }
            if (newBoard[destination].piece.type === "Rook" && !newBoard[destination].piece.moved) {
                newBoard[destination].piece.moved = true
            }
            if (newBoard[destination].piece.type === "King" && !newBoard[destination].piece.moved) {
                newBoard[destination].piece.moved = true
            }
            newBoard[source].piece = {}
            newBoard[source].selected = true
            newBoard.map(square => square.highlight = false)
            setBoard(newBoard)
            setSource('')
            setTurn(turn === "White" ? "Black" : "White")
        } else {
            newBoard.map(square => square.highlight = false)
            setBoard(newBoard)
            setSource('')
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
            if (square.index === id) {
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
                            index={s.index}
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
            <p style={{marginLeft: "10px", marginRight: "10px"}}>{gameState === 'running' ? turn + ' to move' : gameState === "stalemate" ? "Draw" : "Checkmate - " + (turn === "White" ? "Black" : "White") + " wins"}</p>
            <div className="side-panel" style={{marginLeft: '100px', marginRight: 'auto'}}>
                <PieceSidePanel selectPiece={selectPiece}/>
                <button onClick={clearBoard}>Clear Board</button>
            </div>
        </div>
    )
}
