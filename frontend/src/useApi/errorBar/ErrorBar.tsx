import React from 'react';
import './errorBar.scss';

interface OwnProps {
  children: React.ReactNode[] | React.ReactNode;
}

export const ErrorBar = (props: OwnProps) => {
  return <div className="errorBar">
    { props.children }
  </div>
};
