import { datesBetween, isoDayString, prettyDate } from '../date/date-utils';
import React from 'react';
import { SavedExercise } from './types';
import classNames from 'classnames';
import styles from './TrainingTable.module.scss';
import { prettyExerciseName } from './config';
import { prettyMinutes } from '../utils/time';
import { TrainingSummaryRow } from './TrainingSummaryRow';

interface OwnProps {
  trainingData: SavedExercise[];
  className?: string;
}

export const TrainingTable = (props: OwnProps) => {
  const { trainingData } = props;

  const datesWithActivity = Array.from(new Set(trainingData?.map(trainingData => trainingData.date) ?? [])).sort((a, b) => b.localeCompare(a));
  const oldestActivity = new Date(datesWithActivity[datesWithActivity.length-1]);
  const now = new Date(Date.now());
  const days = datesBetween(oldestActivity, now).reverse();
  const weeks = days.filter((_, i) => (i !== 0 && i % 7 === 0) || i === days.length - 1)

  const activitiesByWeek = trainingData.reduce((acc, current) => {
    const summaryDate = weeks.find(date => {
      return new Date(current.date) > date;
    }) ?? weeks[weeks.length - 1];

    if (!acc.has(summaryDate)) {
      acc.set(summaryDate, []);
    }

    acc.get(summaryDate)?.push(current);

    return acc;
  }, new Map<Date, SavedExercise[]>());


  return <table className={styles.table}>
    <tbody>
    {days.map((date, i) => {
      const exercisesForDay = trainingData.filter(e => e.date === isoDayString(date));

      let firstDayRow = true;
      const ActivityRows = exercisesForDay.map((exercise, i) => {
        const Row = <tr key={`exercise-${date}-${i}`} className={classNames(styles.exercise, {
          [styles.firstDateRow]: i === 0,
          [styles.lastDateRow]: i === exercisesForDay.length - 1
        })}>
          <td className={styles.date}>{firstDayRow && prettyDate(date)}</td>
          <td className={styles.type}>{prettyExerciseName(exercise.type)}</td>
          <td className={styles.distance}>{exercise.durationMinutes && `${prettyMinutes(exercise.durationMinutes)}`}</td>
          <td className={styles.duration}>{exercise.distanceMeters && `${(parseInt(exercise.distanceMeters) / 1000)}km`}</td>
          <td className={styles.feeling}>{exercise.feeling}</td>
        </tr>
        firstDayRow = false;
        return Row;
      });

      if (activitiesByWeek.has(date)) {
        ActivityRows.push(<tr key={`exercise-summary-${date}`} className={styles.summary}>
          <td colSpan={2}>
            {prettyDate(date)}
          </td>
          <td colSpan={3}><TrainingSummaryRow date={prettyDate(date)} exercises={activitiesByWeek.get(date)!!} /></td>
        </tr>);
      }

      return ActivityRows;
    })}
    </tbody>
  </table>
};
