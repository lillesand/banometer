import React from 'react';
import { Redirect, Route, Switch } from 'react-router';
import { NetatmoView } from './weather/NetatmoView';
import { BrowserRouter} from 'react-router-dom';
import { WineView } from './wines/WineView';
import { Menu } from './menu/Menu';
import { ForecastView } from './forecast/ForecastView';
import { Dragscroll } from './utils/dragscroll/Dragscroll';
import { Winesync } from './winesync/WinesyncView';
import { SleepView } from './sleep/SleepView';
import { realtimeNavigation, realtimeRoutes } from './realtime/navigation';
import { AddTraining } from './training/add/AddTraining';
import { Training } from './training/Training';
import { PhotosView } from './photos/PhotosView';
import './App.scss';

function App() {
  const touchCssClass = navigator.userAgent.includes('X11') ? 'touch-enabled' : '';

  return <>
    <BrowserRouter>
      <Switch>
        <Route path="/" exact>
          <Redirect to="/wines" />
        </Route>
        <Route path="/sleep">
          <SleepView />
        </Route>
        <Route>
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
                  <Route path="/photos">
                    <PhotosView />
                  </Route>
                  { realtimeRoutes }
                  <Route path="/add_training/:name/:exercise?">
                    <AddTraining />
                  </Route>
                  <Route path="/show_training/:person">
                    <Training />
                  </Route>
                </Switch>
              </Dragscroll>
            </section>
            <Menu dynamicEntries={realtimeNavigation}/>
          </div>
        </Route>
      </Switch>
    </BrowserRouter>
  </>;
}

export default App;
