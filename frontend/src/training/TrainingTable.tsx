import styles from './ShowTraining.module.scss';
import { prettyDate } from '../date/date-utils';
import React from 'react';
import { SavedExercise } from './types';

export const TrainingTable = (props: { trainingData: SavedExercise[] }) => {
  const { trainingData } = props;
  const dates = Array.from(new Set(trainingData?.map(trainingData => trainingData.date)));
  return <table>
    <tbody>
    {dates.sort((a, b) => b.localeCompare(a)).map(date => {
      const exercisesForDay = trainingData.filter(e => e.date === date);
      let firstDayRow = true;
      return exercisesForDay.map((exercise, i) => {
        const Row = <tr className={styles.exercise} key={`exercise-${date}-${i}`}>
          <td className={styles.date}>{firstDayRow && prettyDate(date)}</td>
          <td className={styles.type}>{exercise.type}</td>
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
