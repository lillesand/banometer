import React from 'react';
import { LinkItem, LinkItemProps } from './LinkItem';
import { Button } from '../button/Button';
import styles from './Menu.module.scss';

interface OwnProps {
  dynamicEntries?: React.ReactElement<LinkItemProps>[];
}

export const Menu = (props: OwnProps) => {
  const items = [
    <LinkItem to="/wines" emoji="🍷" text="Vin"/>,
    <LinkItem to="/temperature" emoji="🌡️️" text="Temp"/>,
    <LinkItem to="/forecast" emoji="🌦" text="Vær"/>,
    <LinkItem to="/show_training/jøran" emoji="🏃‍" text="Jøran"/>,
    <LinkItem to="/show_training/linda" emoji="🤸‍️" text="Linda"/>,
  ];

  const allItems = items.concat(props.dynamicEntries ?? []);

  return (
    <nav className={styles.mainNavigation}>
      <ul>
        { allItems.map((menuEntry, i) => <li key={i}>{menuEntry}</li>) }
        <li className={styles.reload}>
          <Button layout="simple" onClick={() => { window.location.reload() }}>
            <span role="img" aria-label="reload">♻️</span>
          </Button>
        </li>
      </ul>
    </nav>
  )
};
