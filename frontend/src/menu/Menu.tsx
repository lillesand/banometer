import React from 'react';
import { LinkEntry } from './LinkItem';
import './Menu.scss';

export const Menu = () => {
  return (
    <nav className="main-navigation">
      <ul>
        <LinkEntry to="/wines" emoji="🍷" text="Vin"/>
        <LinkEntry to="/temperature" emoji="🌡️️" text="Temp"/>
        <LinkEntry to="/forecast" emoji="🌦" text="Vær"/>
      </ul>
    </nav>
  )
};
