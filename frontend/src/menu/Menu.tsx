import React from 'react';
import { LinkEntry, OwnProps as LinkItemProps } from './LinkItem';
import './Menu.scss';

interface OwnProps {
  dynamicEntries?: React.ReactElement<LinkItemProps>[];
}

export const Menu = (props: OwnProps) => {
  return (
    <nav className="main-navigation">
      <ul>
        <LinkEntry to="/wines" emoji="🍷" text="Vin"/>
        <LinkEntry to="/temperature" emoji="🌡️️" text="Temp"/>
        <LinkEntry to="/forecast" emoji="🌦" text="Vær"/>
        { props.dynamicEntries }
      </ul>
    </nav>
  )
};
