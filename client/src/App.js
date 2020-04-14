import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import './App.css';
import Home from './views/Home'
import Board from './Board';
import NavBar from './components/NavBar';

import UserProvider from './context/UserProvider';

function App() {
  return (
    <BrowserRouter>
      <UserProvider>
        <div className="App">
          <NavBar />
          <Route exact path='/' component={Home} />
          <Route exact path='/:id' component={Board} />
          {/* <Route exact path='/profile' component={Profile} /> */}
        </div>
      </UserProvider>
    </BrowserRouter>
  );
}

export default App;
