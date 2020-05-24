import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router';
import { NetatmoView } from './weather/NetatmoView';
import { BrowserRouter, Link } from 'react-router-dom';
import { WineView } from './wines/WineView';

function App() {
  return <>
    <BrowserRouter>
      <nav>
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
