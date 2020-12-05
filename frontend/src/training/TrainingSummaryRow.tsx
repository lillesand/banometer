import React from 'react';
import { SavedExercise } from './types';
import { activities } from './config';

interface OwnProps {
  exercises: SavedExercise[];
  date: string;
}

const assertUnreachable = (x: never) => {
  throw new Error('plz cover all cases');
};

export const TrainingSummaryRow = (props: OwnProps) => {
  const activitySummaries = Object.values(activities).map(activityType => {
    const exercisesOfType = props.exercises.filter(exercise => exercise.type === activityType.type);
    if (exercisesOfType.length === 0) {
      return null;
    }

    switch (activityType.summary) {
      case 'count':
        return <li key={`${activityType.type}-summary-${props.date}`}>{activityType.displayName} {exercisesOfType.length}</li>
      case 'distance':
        const distanceInMeters = exercisesOfType.reduce(((previousValue, currentValue) => previousValue + parseInt(currentValue.distanceMeters ?? '0')), 0);
        return <li key={`${activityType.type}-summary-${props.date}`}>{activityType.displayName} {(distanceInMeters / 1000)}km</li>
    }

    return assertUnreachable(activityType.summary);
  });

  return <ul>{activitySummaries}</ul>;
};
