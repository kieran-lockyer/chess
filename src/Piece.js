import React from 'react'
import BlackKing from './svg/BlackKing.svg'
import WhiteKing from './svg/WhiteKing.svg'
import BlackQueen from './svg/BlackQueen.svg'
import WhiteQueen from './svg/WhiteQueen.svg'
import BlackBishop from './svg/BlackBishop.svg'
import WhiteBishop from './svg/WhiteBishop.svg'
import BlackKnight from './svg/BlackKnight.svg'
import WhiteKnight from './svg/WhiteKnight.svg'
import BlackRook from './svg/BlackRook.svg'
import WhiteRook from './svg/WhiteRook.svg'
import BlackPawn from './svg/BlackPawn.svg'
import WhitePawn from './svg/WhitePawn.svg'

const pieces = {
    "BlackKing": BlackKing,
    "WhiteKing": WhiteKing,
    "BlackQueen": BlackQueen,
    "WhiteQueen": WhiteQueen,
    "BlackBishop": BlackBishop,
    "WhiteBishop": WhiteBishop,
    "BlackKnight": BlackKnight,
    "WhiteKnight": WhiteKnight,
    "BlackRook": BlackRook,
    "WhiteRook": WhiteRook,
    "BlackPawn": BlackPawn,
    "WhitePawn": WhitePawn,
}

export default function Piece(props) {
    const style={
        minHeight: props.dimensions,
        width: props.dimensions
    }

    if (props.piece) { 
        return (
            <img src={pieces[props.piece]} alt={props.piece} style={style} onClick={props.onClick} />
        )
    }
}