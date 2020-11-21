import React from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import styles from './LinkItem.module.scss';

interface OwnProps {
  emoji: string;
  text: string;
  className?: string;
}

interface OnClickProps extends OwnProps {
  onClick: () => void;
}

interface LinkProps extends OwnProps {
  to: string;
}

export type LinkItemProps = OnClickProps | LinkProps;

export const LinkItem = (props: LinkItemProps) => {
  return (
    <Link type="div" to={(props as LinkProps)?.to ?? '#'} onClick={(props as OnClickProps)?.onClick} className={classNames(styles.linkItem, props.className)}>
      <span className={styles.linkEmoji}>{props.emoji}</span>
      <span className={styles.linkText}>{props.text}</span>
    </Link>
  );
};
