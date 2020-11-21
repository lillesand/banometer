import { prettyDate } from '../date/date-utils';
import React from 'react';
import { SavedExercise } from './types';
import classNames from 'classnames';
import styles from './TrainingTable.module.scss';
import { prettyExerciseName } from './config';

interface OwnProps {
  trainingData: SavedExercise[];
  className?: string;
}

export const TrainingTable = (props: OwnProps) => {
  const { trainingData } = props;
  const dates = Array.from(new Set(trainingData?.map(trainingData => trainingData.date)));

  return <table className={styles.table}>
    <tbody>
    {dates.sort((a, b) => b.localeCompare(a)).map(date => {
      const exercisesForDay = trainingData.filter(e => e.date === date);
      let firstDayRow = true;
      return exercisesForDay.map((exercise, i) => {
        const Row = <tr className={classNames(styles.exercise, {
          [styles.firstDateRow]: i === 0,
          [styles.lastDateRow]: i === exercisesForDay.length - 1
        })}
         key={`exercise-${date}-${i}`}>
          <td className={styles.date}>{firstDayRow && prettyDate(date)}</td>
          <td className={styles.type}>{prettyExerciseName(exercise.type)}</td>
          <td className={styles.distance}>{exercise.distanceMeters && `${(exercise.distanceMeters / 1000)}km`}</td>
          <td className={styles.feeling}>{exercise.feeling}</td>
        </tr>
        firstDayRow = false;
        return Row;
      })
    })}
    </tbody>
  </table>
};
