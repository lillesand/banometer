import React from 'react';
import { Route, Switch } from 'react-router';
import { NetatmoView } from './weather/NetatmoView';
import { BrowserRouter} from 'react-router-dom';
import { WineView } from './wines/WineView';
import { Menu } from './menu/Menu';
import './App.scss';

function App() {
  return <>
    <BrowserRouter>
      <Switch>
        <Route path="/wines">
          <WineView />
        </Route>
        <Route path="/weather">
          <NetatmoView />
        </Route>
      </Switch>
      <Menu />
    </BrowserRouter>
  </>;
}

export default App;
