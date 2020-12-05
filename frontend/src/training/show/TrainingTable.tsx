import { SavedExercise } from '../types';
import styles from './TrainingTable.module.scss';
import { isoDayString, prettyDate } from '../../utils/date';
import classNames from 'classnames';
import { prettyExerciseName } from '../config';
import { prettyMinutes } from '../../utils/time';
import { unique } from '../../utils/collections';
import React from 'react';

interface OwnProps {
  trainingData: SavedExercise[];
}

function distanceOrDuration(exercise: SavedExercise) {
  return exercise.distanceMeters ?
    `${(parseInt(exercise.distanceMeters) / 1000)}km` : exercise.durationMinutes ?
      `${prettyMinutes(exercise.durationMinutes)}` : '';
}

export const TrainingTable = (props: OwnProps) => {
  const daysInWeek = unique(props.trainingData.map(excercise => excercise.date)).map(dateString => new Date(dateString)).reverse();
  return (
    <table className={styles.table}>
      <tbody>
      {daysInWeek.map((date, i) => {
        const exercisesForDay = props.trainingData.filter(e => e.date === isoDayString(date));

        let firstDayRow = true;
        return exercisesForDay.map((exercise, i) => {
          const Row = <tr key={`exercise-${date}-${i}`} className={classNames(styles.exercise, {
            [styles.firstDateRow]: i === 0,
            [styles.lastDateRow]: i === exercisesForDay.length - 1
          })}>
            <td className={styles.date}>{firstDayRow && prettyDate(date)}</td>
            <td className={styles.type}>{prettyExerciseName(exercise.type)}</td>
            <td className={styles.distanceOrDuration}>{distanceOrDuration(exercise)}</td>
            <td className={styles.feeling}>{exercise.feeling}</td>
          </tr>
          firstDayRow = false;
          return Row;
        });
      })}
      </tbody>
    </table>
  );
}
