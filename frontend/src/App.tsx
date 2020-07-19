import React from 'react';
import { Route, Switch } from 'react-router';
import { NetatmoView } from './weather/NetatmoView';
import { BrowserRouter} from 'react-router-dom';
import { WineView } from './wines/WineView';
import { Menu } from './menu/Menu';
import { ForecastView } from './forecast/ForecastView';
import { Dragscroll } from './utils/dragscroll/Dragscroll';
import { Winesync } from './winesync/WinesyncView';
import { realtimeNavigation, realtimeRoutes } from './realtime/navigation';
import './App.scss';

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
                { realtimeRoutes }
              </Switch>
            </Dragscroll>
          </section>
        <Menu dynamicEntries={realtimeNavigation}/>
      </div>
    </BrowserRouter>
  </>;
}

export default App;
