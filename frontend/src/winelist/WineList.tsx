import React from 'react';
import styles from './WineList.module.scss';

interface Wine {
  wineName: string;
  rating?: number;
  numberOfBottles?: number | string;
  vintage?: string;
  vintages?: string | React.ReactNode;
}

interface OwnProps {
  title: string;
  wines: Wine[];
  fields: Array<keyof Wine>;
}

const headings = {
  'wineName': 'Vin',
  'rating': 'Poeng',
  'numberOfBottles': 'Antall',
  'vintage': 'Årgang',
  'vintages': 'Årganger',
};

export const WineList = (props: OwnProps) => {
  const { title, wines, fields } = props;

  return <div className={styles.wineListing}>
    <h3>{title}</h3>
    <table className={ styles.wineTable }>
      <thead>
      <tr>
        { fields.map(field => {
          return <td key={field + '-heading'}>{headings[field]}</td>
        }) }
      </tr>
      </thead>
      <tbody>
      {wines.map((wine, index) =>
        <tr key={wine.wineName}>
          {fields.map(field => {
            return <td key={wine.wineName + '-' + field}>{wine[field]}</td>
          })}
        </tr>
      )}
      </tbody>
    </table>
  </div>
};
