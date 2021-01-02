import { LinkItemProps } from '../menu/LinkItem';
import React from 'react';
import styles from './TopBarNavigation.module.scss';

interface OwnProps {
  title: {
    capitalized: string;
    rest?: string;
  };
  children: React.ReactElement<LinkItemProps> | React.ReactElement<LinkItemProps>[];
}

export const TopBarNavigation = (props: OwnProps) => {
  return <div className={styles.topBar}>
    <h2 className={styles.title}>
      <span className={styles.capitalized}>{props.title.capitalized}</span> {props.title.rest}
    </h2>
    <nav>
      { props.children }
    </nav>
  </div>;
}
