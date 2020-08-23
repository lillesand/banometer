import React from 'react';
import { Link } from 'react-router-dom';

export interface OwnProps {
  emoji: string;
  text: string;
  to: string;
}

type Props = OwnProps;

export const LinkEntry = (props: Props) => {
  return (
    <li>
      <Link to={props.to}>
        <span className="main-navigation__link-emoji">{props.emoji}</span>
        <span className="main-navigation__link-text">{props.text}</span>
      </Link>
    </li>
  );
};
