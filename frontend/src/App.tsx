import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router';
import WineView from './wines/WineView';
import { BrowserRouter } from 'react-router-dom';

function App() {
  return <>
    <div>
      Flibbediflopp
    </div>
    <BrowserRouter>
      <Switch>
        <Route path="/wines">
          <WineView/>
        </Route>
      </Switch>
    </BrowserRouter>
  </>;
}

export default App;
