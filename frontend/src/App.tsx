import React from 'react';
import { Route, Switch } from 'react-router';
import { NetatmoView } from './weather/NetatmoView';
import { BrowserRouter} from 'react-router-dom';
import { WineView } from './wines/WineView';
import { Menu } from './menu/Menu';
import { ForecastView } from './forecast/ForecastView';
import { Dragscroll } from './utils/dragscroll/Dragscroll';
import './App.scss';

function App() {
  return <>
    <BrowserRouter>
      <div className="app">
        <section className="main">
          <Switch>
            <Route path="/wines">
              <WineView />
            </Route>
            <Route path="/temperature">
              <NetatmoView />
            </Route>
            <Route path="/forecast">
              <Dragscroll>
                <ForecastView />
              </Dragscroll>
            </Route>
          </Switch>
        </section>
        <Menu />
      </div>
    </BrowserRouter>
  </>;
}

export default App;
