import React from 'react';
import { OwnProps as GridRowEntryProps } from './GridRowEntry';
import './grid.scss';

interface OwnProps {
  children: React.ReactElement<GridRowEntryProps>[] | React.ReactElement<GridRowEntryProps>;
  heading: string;
}

export const GridRow = (props: OwnProps) => {
  const children = Array.isArray(props.children) ? props.children : [props.children];

  return <>
    { props.heading && <h3 className="number-grid-row__heading">{props.heading}</h3> }
      <div className="number-grid-row__row">
        {children}
      </div>
  </>
};


