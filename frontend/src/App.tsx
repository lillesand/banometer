import React from 'react';
import { Route, Switch } from 'react-router';
import { NetatmoView } from './weather/NetatmoView';
import { BrowserRouter, Link } from 'react-router-dom';
import { WineView } from './wines/WineView';
import './App.scss';

function App() {
  return <>
    <BrowserRouter>
      <nav className="main-navigation">
        <ul>
          <li><Link to="/wines">Vin</Link></li>
          <li><Link to="/weather">Vær</Link></li>
        </ul>
      </nav>

      <Switch>
        <Route path="/wines">
          <WineView />
        </Route>
        <Route path="/weather">
          <NetatmoView />
        </Route>
      </Switch>
    </BrowserRouter>
  </>;
}

export default App;
