import React from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import styles from './LinkItem.module.scss';

interface OwnProps {
  emoji: string;
  text: string;
  active?: boolean;
  className?: string;
  disabled?: boolean
}

interface OnClickProps extends OwnProps {
  onClick: () => void;
}

interface LinkProps extends OwnProps {
  to: string;
}

export type LinkItemProps = OnClickProps | LinkProps;

export const LinkItem = (props: LinkItemProps) => {
  const to = props.disabled ? '#' : (props as LinkProps)?.to ?? '#';
  const onClick = props.disabled ? undefined : (props as OnClickProps)?.onClick

  return (
    <Link type="div" to={to}
          onClick={onClick}
          className={classNames(styles.linkItem, props.className, {
            [styles.active]: props.active ?? false
          })}>
      <span className={styles.linkEmoji}>{props.emoji}</span>
      <span className={styles.linkText}>{props.text}</span>
    </Link>
  );
};
