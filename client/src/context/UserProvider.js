import React, { useState } from 'react';
import { UserContext } from './UserContext';

export default function UserProvider(props) {
    const [user, setUser] = useState({
        displayName: 'Qibla',
        email: 'xqibla@gmail.com',
        games: []
    });

    return (
        <UserContext.Provider value={user}>
            {props.children}
        </UserContext.Provider>
    )
}
