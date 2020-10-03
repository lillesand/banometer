import React from 'react';
import styles from './WineList.module.scss';
import classNames from 'classnames';

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

const fieldConfig: {[key: string]: { heading: string, classes?: string}} = {
  'wineName': {
    heading: 'Vin',
  },
  'rating': {
    heading: 'Poeng',
  },
  'numberOfBottles': {
    heading: 'Antall',
    classes: 'numberColumn',
  },
  'vintage': {
    heading: 'Årgang',
    classes: 'numberColumn',
  },
  'vintages': {
    heading: 'Årganger',
    classes: 'vintages',
  },
};

export const WineList = (props: OwnProps) => {
  const { title, wines, fields } = props;

  return <div className={styles.wineListing}>
    <h3>{title}</h3>
    <table className={ styles.wineTable }>
      <thead>
      <tr>
        { fields.map(field => {
          return <td key={field + '-heading'}>{fieldConfig[field].heading}</td>
        }) }
      </tr>
      </thead>
      <tbody>
      {wines.map((wine, index) =>
        <tr key={wine.wineName}>
          {fields.map(field => {
            const classes = fieldConfig[field]?.classes?.split(' ') ?? [];
            return <td className={classNames(classes.map(className => styles[className]))} key={wine.wineName + '-' + field}>{wine[field]}</td>
          })}
        </tr>
      )}
      </tbody>
    </table>
  </div>
};
