import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Game from './pages/Game';
import Login from './pages/Login';
import Settings from './pages/Settings';

function App() {
  return (
    <Switch>
      <Route path="/settings" component={ Settings } />
      <Route path="/game" component={ Game } />
      <Route exact path="/" component={ Login } />
    </Switch>
  );
}

export default App;
