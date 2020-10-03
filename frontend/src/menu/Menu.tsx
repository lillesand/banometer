import React from 'react';
import { LinkEntry, OwnProps as LinkItemProps } from './LinkItem';
import styles from './Menu.module.scss';

interface OwnProps {
  dynamicEntries?: React.ReactElement<LinkItemProps>[];
}

export const Menu = (props: OwnProps) => {
  const items = [
    <LinkEntry to="/wines" emoji="🍷" text="Vin"/>,
    <LinkEntry to="/wine_sync" emoji="🥂" text="Synk"/>,
    <LinkEntry to="/temperature" emoji="🌡️️" text="Temp"/>,
    <LinkEntry to="/forecast" emoji="🌦" text="Vær"/>,
  ];

  const allItems = items.concat(props.dynamicEntries ?? []);

  return (
    <nav className={styles.mainNavigation}>
      <ul>
        { allItems.map(menuEntry => <li>{menuEntry}</li>) }
      </ul>
    </nav>
  )
};
