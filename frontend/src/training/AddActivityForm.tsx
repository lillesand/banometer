import { ActivityConfig, SavedExercise } from './types';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router';
import database from '../firebase-storage/config';
import { lastWeek } from '../date/date-utils';
import React, { useState } from 'react';
import { HighlightedRadioButton } from '../form/HighlightedRadioButton';
import { ErrorBar } from '../useApi/errorBar/ErrorBar';
import styles from './AddActivityForm.module.scss';

interface FormData {
  type: string;
  feeling?: string;
  distance?: number;
  date: string;
}

interface OwnProps {
  person: string;
  activity: ActivityConfig;
}

export const AddActivityForm = (props: OwnProps) => {
  const { activity, person } = props;
  const { register, handleSubmit, reset } = useForm<FormData>();
  const [ errorMessage, setErrorMessage ] = useState<string | undefined>();

  const history = useHistory();
  const onSubmit = handleSubmit(datas => {
    const date = new Date(datas.date);
    const toSave: SavedExercise = {
      year: date.getUTCFullYear(),
      month: date.getUTCMonth(),
      day: date.getUTCDay(),
      ...datas
    };

    database.ref(`users/${person}/exercises`).push(toSave)
      .then(() => {
        reset();
        history.push(`/show_training/${person}`);
      })
      .catch(reason => {
        console.error(reason);
        setErrorMessage(`Klarte ikke å lagre!! Feil:\n\n${reason.toString()}`)
      });
  });

  const dates = lastWeek();
  return <>
    { errorMessage && <ErrorBar>{errorMessage}</ErrorBar> }
    <form onSubmit={onSubmit} className={styles.addTrainingForm}>
      <input type="hidden" name="type" value={activity.type.type} ref={register}/>

      <fieldset>
        {dates.map((day, index) => {
          const [prettyDate, date] = day;
          return <HighlightedRadioButton displayStyle="styleText" key={'date-input-' + date} name="date" label={prettyDate} value={date} defaultChecked={index === 0} ref={register}/>
        })}
      </fieldset>

      {activity.feelings && <fieldset>
        {activity.feelings.options.map(feeling =>
          <HighlightedRadioButton displayStyle="styleEmojiSelector" key={'feeling-input-' + feeling} name="feeling" value={feeling} defaultChecked={feeling === activity?.feelings?.default} ref={register}/>
        )}
      </fieldset>}

      {activity.distance && <fieldset>
        {activity.distance.map(distance =>
          <HighlightedRadioButton displayStyle="styleText" key={'distance-input-' + distance} name="distanceMeters" label={distance / 1000 + 'km'} value={distance.toString()} ref={register}/>
        )}
      </fieldset>}

      <button type="submit">Lagre</button>
    </form>
  </>
};
