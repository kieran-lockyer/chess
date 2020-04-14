import React, { useContext } from 'react'
import axios from 'axios';

export default function Home() {
    const options = [
        {length: 1, increment: 0, type: 'Bullet'},
        {length: 2, increment: 0, type: 'Bullet'},
        {length: 3, increment: 0, type: 'Blitz'},
        {length: 3, increment: 0, type: 'Blitz'},
        {length: 5, increment: 0, type: 'Blitz'},
        {length: 5, increment: 0, type: 'Blitz'},
        {length: 10, increment: 0, type: 'Rapid'},
        {length: 10, increment: 0, type: 'Rapid'},
        {length: 15, increment: 0, type: 'Rapid'},
        {length: 30, increment: 0, type: 'Classical'},
        {length: 30, increment: 0, type: 'Classical'},
        {length: 0, increment: 0, type: 'Custom'},
    ];

    const createGame = (length, increment) => {
        axios.get('localhost:3001/init/' + length + '/' + increment).then(gameId => {

        })
    }
    
    return (
        <div className="game-options-grid">
            {options.map(option => {
                return (
                    <div className="game-option" onClick={option.length, option.increment}>
                        {option.length !== 0 && <p>{option.length} | {option.increment}</p>}
                        <p>{option.type}</p>
                    </div>
                )
            })}
        </div>
    )
}
