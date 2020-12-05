import { datesBetween, prettyDate, prettyWeeksAgo } from '../../utils/date';
import React from 'react';
import { SavedExercise } from '../types';
import { TrainingSummary } from './TrainingSummary';
import { TrainingTable } from './TrainingTable';
import styles from './ShowTraining.module.scss';

interface OwnProps {
  trainingData: SavedExercise[];
  className?: string;
}

export const ShowTraining = (props: OwnProps) => {
  const { trainingData } = props;

  const datesWithActivity = (trainingData?.map(trainingData => trainingData.date) ?? []).sort((a, b) => b.localeCompare(a));
  const oldestActivity = new Date(datesWithActivity[datesWithActivity.length-1]);
  const days = datesBetween(oldestActivity, new Date(Date.now())).reverse();
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

  return (
    <>
      {
        weeks.map((startDate, i) => {
          const exercises = activitiesByWeek.get(startDate)!!;

          return (
            <div key={`training-week-${prettyDate(startDate)}`} className={styles.showTraining}>
              <h2>{prettyWeeksAgo(i)}</h2>
              <TrainingSummary date={prettyDate(startDate)} exercises={exercises}/>
              <TrainingTable trainingData={exercises} />
            </div>
          )
        })
      }
    </>
  );
};
