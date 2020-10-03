import React from 'react';
import { LinkItem, OwnProps as LinkItemProps } from './LinkItem';
import styles from './Menu.module.scss';

interface OwnProps {
  dynamicEntries?: React.ReactElement<LinkItemProps>[];
}

export const Menu = (props: OwnProps) => {
  const items = [
    <LinkItem to="/wines" emoji="🍷" text="Vin"/>,
    <LinkItem to="/wine_sync" emoji="🥂" text="Synk"/>,
    <LinkItem to="/temperature" emoji="🌡️️" text="Temp"/>,
    <LinkItem to="/forecast" emoji="🌦" text="Vær"/>,
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
