import React from 'react';
import { Link } from 'react-router-dom';
import styles from './LinkItem.module.scss';

export interface OwnProps {
  emoji: string;
  text: string;
  to: string;
}

type Props = OwnProps;

export const LinkItem = (props: Props) => {
  return (
    <Link to={props.to} className={styles.linkItem}>
      <span className={styles.linkEmoji}>{props.emoji}</span>
      <span className={styles.linkText}>{props.text}</span>
    </Link>
  );
};
