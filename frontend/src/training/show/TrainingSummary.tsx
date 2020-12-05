import React from 'react';
import { SavedExercise } from '../types';
import { activities } from '../config';
import styles from './TrainingSummary.module.scss';
import { pluralize } from '../../utils/strings';

interface OwnProps {
  exercises: SavedExercise[];
  date: string;
}

const assertUnreachable = (x: never) => {
  throw new Error('plz cover all cases');
};

export const TrainingSummary = (props: OwnProps) => {
  const activitySummaries = Object.values(activities).map(activityType => {
    const exercisesOfType = props.exercises.filter(exercise => exercise.type === activityType.type);
    if (exercisesOfType.length === 0) {
      return null;
    }

    switch (activityType.summary) {
      case 'count':
        return (
          <li key={`${activityType.type}-summary-${props.date}`}>
            {exercisesOfType.length} {pluralize(exercisesOfType.length, 'økt', 'økter')} {activityType.displayName}
          </li>
        );
      case 'distance':
        const distanceInMeters = exercisesOfType.reduce(((previousValue, currentValue) => previousValue + parseInt(currentValue.distanceMeters ?? '0')), 0);
        return (
          <li key={`${activityType.type}-summary-${props.date}`}>
            {(distanceInMeters / 1000)}km {activityType.displayName}
          </li>
        );
    }

    return assertUnreachable(activityType.summary);
  });

  return <ul className={styles.trainingSummary}>{activitySummaries}</ul>;
};
