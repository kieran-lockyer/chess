import React from 'react'
import Piece from './Piece'

export default function PieceSidePanel(props) {

    return (
        <div style={{display: 'flex'}}>
            <div>
                <Piece piece={"WhitePawn"} onClick={() => props.selectPiece({type:"Pawn", colour:"White"})} />
                <Piece piece={"WhiteKnight"} onClick={() => props.selectPiece({type:"Knight", colour:"White"})} />
                <Piece piece={"WhiteBishop"} onClick={() => props.selectPiece({type:"Bishop", colour:"White"})} />
                <Piece piece={"WhiteRook"} onClick={() => props.selectPiece({type:"Rook", colour:"White"})} />
                <Piece piece={"WhiteQueen"} onClick={() => props.selectPiece({type:"Queen", colour:"White"})} />
                <Piece piece={"WhiteKing"} onClick={() => props.selectPiece({type:"King", colour:"White"})} />
            </div>
            <div>
                <Piece piece={"BlackPawn"} onClick={() => props.selectPiece({type:"Pawn", colour:"Black"})} />
                <Piece piece={"BlackKnight"} onClick={() => props.selectPiece({type:"Knight", colour:"Black"})} />
                <Piece piece={"BlackBishop"} onClick={() => props.selectPiece({type:"Bishop", colour:"Black"})} />
                <Piece piece={"BlackRook"} onClick={() => props.selectPiece({type:"Rook", colour:"Black"})} />
                <Piece piece={"BlackQueen"} onClick={() => props.selectPiece({type:"Queen", colour:"Black"})} />
                <Piece piece={"BlackKing"} onClick={() => props.selectPiece({type:"King", colour:"Black"})} />
            </div>
        </div>
    )
}
