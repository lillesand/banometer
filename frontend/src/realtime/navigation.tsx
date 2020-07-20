import { realtimeConfig } from './config';
import { Route } from 'react-router';
import { RealtimeView } from './RealtimeView';
import React from 'react';
import { LinkEntry } from '../menu/LinkItem';

export const realtimeRoutes = realtimeConfig.screens.map(stopScreen =>
    <Route path={'/realtime' + stopScreen.path} key={'route' + stopScreen.name}>
      <RealtimeView stopIds={stopScreen.stopPlaces} quays={stopScreen.quays}/>
    </Route>
);

export const realtimeNavigation = realtimeConfig.screens.map(stopScreen =>
  <LinkEntry emoji={stopScreen.symbol} text={stopScreen.name} to={"/realtime" + stopScreen.path} key={'link-' + stopScreen.name}/>
);
