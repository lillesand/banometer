import React from 'react';

export interface OwnProps{
  children: React.ReactNode;
  fieldName?: string;
}

export const GridRowEntry = (props: OwnProps) => {
  return <div className="number-grid-row__entry">
    <span className="number-grid-row__number">{props.children}</span>
    {props.fieldName && <span className="number-grid-row__detail">{props.fieldName}</span>}
  </div>;
};
