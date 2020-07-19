import React from 'react';
import { Route, Switch } from 'react-router';
import { NetatmoView } from './weather/NetatmoView';
import { BrowserRouter} from 'react-router-dom';
import { WineView } from './wines/WineView';
import { Menu } from './menu/Menu';
import { ForecastView } from './forecast/ForecastView';
import { Dragscroll } from './utils/dragscroll/Dragscroll';
import { Winesync } from './winesync/WinesyncView';
import './App.scss';
import { RealtimeView } from './realtime/RealtimeView';

function App() {
  const touchCssClass = navigator.userAgent.includes('X11') ? 'touch-enabled' : '';

  return <>
    <BrowserRouter>
      <div className={"app " + touchCssClass}>
          <section className="main">
            <Dragscroll>
              <Switch>
                <Route path="/wines">
                  <WineView />
                </Route>
                <Route path="/wine_sync">
                  <Winesync />
                </Route>
                <Route path="/temperature">
                  <NetatmoView />
                </Route>
                <Route path="/forecast">
                  <ForecastView />
                </Route>
                <Route path="/realtime">
                  <RealtimeView stopIds={['NSR:StopPlace:6193', 'NSR:StopPlace:59649']}
                                quays={[{id: 'NSR:Quay:11367', name: 'Godals vei til Brekkekrysset og Skar'},
                                  {id: 'NSR:Quay:494', name: 'Gjøvikbanen'}]}
                  />
                </Route>
              </Switch>
            </Dragscroll>
          </section>
        <Menu />
      </div>
    </BrowserRouter>
  </>;
}

export default App;
