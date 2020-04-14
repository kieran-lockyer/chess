import React from 'react'
import Piece from './Piece'

export default function PieceSidePanel(props) {

    return (
        <div style={{display: 'flex'}}>
            <div>
                <Piece piece={"WhitePawn"} onClick={() => props.selectPiece({type:"Pawn", colour:"White"})} dimensions={`${props.dimensions}vw`} />
                <Piece piece={"WhiteKnight"} onClick={() => props.selectPiece({type:"Knight", colour:"White"})} dimensions={`${props.dimensions}vw`} />
                <Piece piece={"WhiteBishop"} onClick={() => props.selectPiece({type:"Bishop", colour:"White"})} dimensions={`${props.dimensions}vw`} />
                <Piece piece={"WhiteRook"} onClick={() => props.selectPiece({type:"Rook", colour:"White"})} dimensions={`${props.dimensions}vw`} />
                <Piece piece={"WhiteQueen"} onClick={() => props.selectPiece({type:"Queen", colour:"White"})} dimensions={`${props.dimensions}vw`} />
                <Piece piece={"WhiteKing"} onClick={() => props.selectPiece({type:"King", colour:"White"})} dimensions={`${props.dimensions}vw`} />
            </div>
            <div>
                <Piece piece={"BlackPawn"} onClick={() => props.selectPiece({type:"Pawn", colour:"Black"})} dimensions={`${props.dimensions}vw`} />
                <Piece piece={"BlackKnight"} onClick={() => props.selectPiece({type:"Knight", colour:"Black"})} dimensions={`${props.dimensions}vw`} />
                <Piece piece={"BlackBishop"} onClick={() => props.selectPiece({type:"Bishop", colour:"Black"})} dimensions={`${props.dimensions}vw`} />
                <Piece piece={"BlackRook"} onClick={() => props.selectPiece({type:"Rook", colour:"Black"})} dimensions={`${props.dimensions}vw`} />
                <Piece piece={"BlackQueen"} onClick={() => props.selectPiece({type:"Queen", colour:"Black"})} dimensions={`${props.dimensions}vw`} />
                <Piece piece={"BlackKing"} onClick={() => props.selectPiece({type:"King", colour:"Black"})} dimensions={`${props.dimensions}vw`} />
            </div>
        </div>
    )
}
