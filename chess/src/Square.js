import React from 'react'

export default function Square(props) {
    const style = {
        backgroundColor: props.selected ? props.squareColour === "Black" ? "#4477ad" : "#8ec0ff" : props.squareColour === "Black" ? "#404e92" : "#a8b2e4",
        width: props.dimensions,
        height: props.dimensions
    }

    if (props.highlight) {
        style.backgroundColor = props.squareColour === "Black" ? "#b77647" : "#de9d4d"
    }
    
    return (
        <div
            id={props.id}
            style={style}
            onClick={props.selectSquare}
        >
            {props.children}
        </div>
    )
}
