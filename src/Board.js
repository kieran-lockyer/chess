import React, {useState, useEffect, useReducer} from 'react'
import Square from './Square'
import Piece from './Piece'
import PieceSidePanel from './PieceSidePanel'
import setUpBoard from './utils/setUpBoard'
import checkLegalMoves from './utils/checkLegalMoves'
import checkThreats from './utils/checkThreats'
import {isKingInCheck} from './utils/common'
import './Board.css'
import PawnPromotionModal from './PawnPromotionModal'
import uuidv4 from 'uuid/v4'

const initialState = { boardHistory: [], historyIndex: 0, turn: "White" }

const reducer = (state, action) => {
    switch (action.type) {
        case "add_to_history":
            return { ...state, boardHistory: [...state.boardHistory, action.payload] }
        case "increment_historyIndex":
            return { ...state, historyIndex: state.historyIndex + action.payload }
        case "decrement_historyIndex":
            return { ...state, historyIndex: state.historyIndex - action.payload }
        case "change_turn":
            return { ...state, turn: state.turn === "White" ? "Black" : "White" }
        case "promote_pawn":
            return { ...state, boardHistory: [ ...state.boardHistory.splice(0, state.boardHistory.length - 1), action.payload]}
        default:
            throw new Error()
    }
}

export default function Board() {
    const [loading, setLoading] = useState(true)
    const [board, setBoard] = useState([])
    const [legalMoves, setLegalMoves] = useState({white: [], black: []})
    const [threats, setThreats] = useState({white: [], black: []})
    const [dimensions, setDimensions] = useState(5)
    const [source, setSource] = useState('')
    const [placeMode, setPlaceMode] = useState({})
    const [gameState, setGameState] = useState('searching')
    const [autoQueen, setAutoQueen] = useState(false)
    const [menu, setMenu] = useState('moves')
    const [position, setPosition] = useState(null)
    const [token, setToken] = useState(uuidv4())
    const [state, dispatch] = useReducer(reducer, initialState)
    const [connection, setConnection] = useState(new WebSocket('ws://warm-shore-31398.herokuapp.com/'))


    useEffect(() => {
        const board = setUpBoard()
        setBoard(board)
        dispatch({type: 'add_to_history', payload: board})
        setLoading(false)

        connection.onopen = () => {
            console.log('connection established', connection)
            connection.send(JSON.stringify({action: 'searching', token}))
        }

        connection.onmessage = (message) => {
            const data = JSON.parse(message.data)
            if (data.position) {
                setPosition(data.position)
            }
            if (data.state === 'begin') {
                setGameState('running')
            }
            if (data.move) {
                if (data.token !== token) {
                    setBoard(data.move)
                    dispatch({type: "add_to_history", payload: data.move})
                    dispatch({type: "increment_historyIndex", payload: 1})
                    dispatch({type: "change_turn", payload: ""})
                }
            }
            if (data.promote_pawn) {
                if (data.token !== token) {
                    setBoard(data.promote_pawn)
                    dispatch({type: "promote_pawn", payload: data.promote_pawn})
                }
            }
        }
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
        if (newLegalMoves[state.turn.toLowerCase()].length === 0) {
            for (let square of board) {
                if (square.piece.type) {
                    if (square.piece.type === "King") {
                        if (square.piece.colour === state.turn) {
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
        checkThreefoldRepetition()
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
        if (position !== state.turn) {
            return
        }
        if (source !== '') {
            movePiece(source, s.index)
        } else {
            if (state.turn === s.piece.colour) {
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

            if (newBoard[destination].piece.type === "Pawn") {
                if (destination >= 56 && destination <=63 && newBoard[destination].piece.colour === "White") {
                    if (autoQueen) {
                        newBoard[destination].piece = {type: "Queen", colour: "White"}
                    } else {
                        let modal = document.getElementById("pawn_promotion");
                        modal.style.display = "flex";
                    }
                }
                if (destination >= 0 && destination <=7 && newBoard[destination].piece.colour === "Black") {
                    if (autoQueen) {
                        newBoard[destination].piece = {type: "Queen", colour: "Black"}
                    } else {
                        let modal = document.getElementById("pawn_promotion");
                        modal.style.display = "block";
                    }
                }
                // caputure enpassant check
                if (destination >= 40 && destination <= 47) {
                    if (newBoard[destination - 8].piece.enpassant) {
                        newBoard[destination - 8].piece = {}
                    }
                }
                if (destination >= 16 && destination <= 23) {
                    if (newBoard[destination + 8].piece.enpassant) {
                        newBoard[destination + 8].piece = {}
                    }
                }
            }

            // remove existing enpassant
            newBoard.map(square => { 
                if (square.piece.type) {
                    if (square.piece.enpassant) {
                        square.piece.enpassant = false
                    }
                }
                return square
            })
            if (newBoard[destination].piece.type === "Pawn" && !newBoard[destination].piece.moved) {
                newBoard[destination].piece.moved = true
                // apply new enpassant
                if (newBoard[destination].piece.colour === "White") { 
                    if (destination >= 24 && destination <= 31) {
                        newBoard[destination].piece.enpassant = true
                    }
                } else {
                    if (destination >= 32 && destination <= 39) {
                        newBoard[destination].piece.enpassant = true
                    }
                }
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
            dispatch({type: "change_turn", payload: ""})
        } else {
            newBoard.map(square => square.highlight = false)
            setBoard(newBoard)
            setSource('')
        }
        dispatch({type: "add_to_history", payload: newBoard})
        dispatch({type: "increment_historyIndex", payload: 1})
        connection.send(JSON.stringify({move: newBoard, token, action: 'move'}))
    }

    const selectPiece = (piece) => {
        setPlaceMode(piece)
    }

    const placePiece = (id) => {
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
    
    const promote = (piece) => {
        const newBoard = JSON.parse(JSON.stringify(board))
        if (piece.colour === "White") {
            for (let square = 56; square <= 63; square++) {
                if (newBoard[square].piece.type === "Pawn") {
                    newBoard[square].piece = piece
                    break
                }
            }
        } else {
            for (let square = 0; square <= 7; square++) {
                if (newBoard[square].piece.type === "Pawn") {
                    newBoard[square].piece = piece
                    break
                }
            }
        }
        setBoard(newBoard)
        dispatch({type: 'promote_pawn', payload: newBoard})
        connection.send(JSON.stringify({move: newBoard, token, action: 'promote_pawn'}))
        let modal = document.getElementById("pawn_promotion");
        modal.style.display = "none";
    }

    const checkThreefoldRepetition = () => {
        let occurrences = {}
        for (let position of state.boardHistory) {
            const positionString = JSON.stringify(position)
            if (occurrences[positionString]) {
                occurrences[positionString] += 1 
            } else {
                occurrences[positionString] = 1
            }
        }
        for (let position of Object.keys(occurrences)) {
            if (occurrences[position] >= 3) {
                setGameState('stalemate')
            }
        }
    }

    if (loading) {
        return (
            <div>Loading</div>
        )
    }
    
    return (
        <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
            <div className="Board" style={{width: `${dimensions * 8}vw`}}>
                    {state.boardHistory.length > 0 && state.historyIndex === state.boardHistory.length - 1 ? (
                        board.map((s, s_idx) => {
                            let squareColour = Math.floor(s_idx / 8) % 2 === 0 ? s_idx % 2 === 0 ? "Black" : "White" : s_idx % 2 === 0 ? "White" : "Black"

                            return (
                                <Square 
                                    key={`sqaure${s_idx}`} 
                                    id={s.id}
                                    index={s.index}
                                    dimensions={`${dimensions}vw`} 
                                    squareColour={squareColour}
                                    selectSquare={() => selectSquare(s)}
                                    placeMode={placeMode}
                                    placePiece={placePiece}
                                    selected={s.selected}
                                    highlight={s.highlight}
                                >
                                    {s.piece.type && <Piece piece={s.piece.colour + s.piece.type} dimensions={`${dimensions}vw`} />}
                                </Square>
                            )
                        })
                    ) : (
                        state.boardHistory[state.historyIndex] && state.boardHistory[state.historyIndex].map((s, s_idx) => {
                            let squareColour = Math.floor(s_idx / 8) % 2 === 0 ? s_idx % 2 === 0 ? "Black" : "White" : s_idx % 2 === 0 ? "White" : "Black"

                            return (
                                <Square 
                                    key={`sqaure${s_idx}`} 
                                    id={s.id}
                                    index={s.index}
                                    dimensions={`${dimensions}vw`} 
                                    squareColour={squareColour}
                                    selectSquare={() => selectSquare(s)}
                                    placeMode={placeMode}
                                    placePiece={placePiece}
                                    selected={s.selected}
                                    highlight={s.highlight}
                                >
                                    {s.piece.type && <Piece piece={s.piece.colour + s.piece.type} dimensions={`${dimensions}vw`} />}
                                </Square>
                            )
                        })
                    )}
            </div>
            <div className="side-panel" >
                <p style={{marginLeft: "10px", marginRight: "10px"}}>{gameState === 'running' ? state.turn + ' to move' : gameState === "stalemate" ? "Draw" : "Checkmate - " + (state.turn === "White" ? "Black" : "White") + " wins"}</p>
                <button onClick={() => setMenu('moves')}>Move History</button>
                <button onClick={() => setMenu('setup')}>Set Up Board</button>
                {menu === 'moves' ? (
                    <div>
                        {state.historyIndex > 0 && <button onClick={() => dispatch({type: "decrement_historyIndex", payload: 1})}>{'<'}</button>}
                        {state.boardHistory.length > 1 && state.historyIndex < state.boardHistory.length - 1 &&  <button onClick={() => dispatch({type: "increment_historyIndex", payload: 1})}>{'>'}</button>}
                    </div>
                ) : (
                    <div>
                        <PieceSidePanel selectPiece={selectPiece} dimensions={dimensions}/>
                        <button onClick={clearBoard}>Clear Board</button>
                    </div>
                )}
                <button onClick={() => setAutoQueen(!autoQueen)} style={{backgroundColor: autoQueen ? "green" : "grey"}}>Auto Queen</button>
            </div>
            <PawnPromotionModal promote={promote} dimensions={dimensions} turn={state.turn}/>
        </div>
    )
}
