import React from 'react'
import Square from './Square'
import Piece from './Piece'

export default function PawnPromotionModal(props) {
    return (
        <div id="pawn_promotion" className="modal">
                <div className="modal-content">
                    <Square 
                            id={"Promote__Knight"}
                            modal={true}
                            dimensions={`${props.dimensions}vw`} 
                            squareColour={"White"}
                            piece={{type: "Knight", colour: props.turn === "White" ? "Black" : "White"}}
                            promote={(p) => props.promote(p)}
                        >
                            <Piece piece={(props.turn === "White" ? "Black" : "White") + "Knight"} dimensions={`${props.dimensions}vw`} />
                    </Square>
                    <Square 
                            id={"Promote__Bishop"}
                            modal={true}
                            dimensions={`${props.dimensions}vw`} 
                            squareColour={"White"}
                            piece={{type: "Bishop", colour: props.turn === "White" ? "Black" : "White"}}
                            promote={(p) => props.promote(p)}
                        >
                            <Piece piece={(props.turn === "White" ? "Black" : "White") + "Bishop"} dimensions={`${props.dimensions}vw`} />
                    </Square>
                    <Square 
                            id={"Promote__Rook"}
                            modal={true}
                            dimensions={`${props.dimensions}vw`} 
                            squareColour={"White"}
                            piece={{type: "Rook", colour: props.turn === "White" ? "Black" : "White"}}
                            promote={(p) => props.promote(p)}
                        >
                            <Piece piece={(props.turn === "White" ? "Black" : "White") + "Rook"} dimensions={`${props.dimensions}vw`} />
                    </Square>
                    <Square 
                            id={"Promote__Queen"}
                            modal={true}
                            dimensions={`${props.dimensions}vw`} 
                            squareColour={"White"}
                            piece={{type: "Queen", colour: props.turn === "White" ? "Black" : "White"}}
                            promote={(p) => props.promote(p)}
                        >
                            <Piece piece={(props.turn === "White" ? "Black" : "White") + "Queen"} dimensions={`${props.dimensions}vw`} />
                    </Square>
                </div>
            </div>
    )
}
