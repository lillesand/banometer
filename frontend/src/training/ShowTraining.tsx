import React, { useEffect, useState } from 'react';
import database from '../firebase-storage/config';
import { SavedExercise } from './types';
import { prettyDate } from '../date/date-utils';
import styles from './ShowTraining.module.scss';
import { LinkItem } from '../menu/LinkItem';


export const ShowTraining = () => {
  const [trainingData, setData] = useState<SavedExercise[]>([]);

  const fetchExercise = async () => {
    const res = await database.ref('users/jøran/exercises').orderByKey().once('value');
    const data = await Object.values(res.val());
    setData(data as SavedExercise[]);
  }

  useEffect(() => {
    fetchExercise();
  }, []);

  if (trainingData.length === 0) {
    return <div>loading… (?)</div>;
  }


  const dates = Array.from(new Set(trainingData?.map(trainingData => trainingData.date)));
  return <div className={styles.page}>
    <LinkItem className={styles.addTraining} to="/add_training" emoji="➕" text="Ny" />
    <table>
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
  </div>;
};
