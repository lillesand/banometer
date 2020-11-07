import React from 'react';
import classNames from 'classnames';
import styles from './Button.module.scss';

interface OwnProps {
  layout?: 'simple';
}

export const Button = (props: OwnProps & React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>) => {


  return <button {...props}
                 className={classNames(styles.button, props.className, {
                   [styles.simple]: props.layout === 'simple'
                 })}>
    {props.children}
  </button>
};
