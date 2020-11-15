import React, { useState } from 'react';
import { LinkItem } from '../menu/LinkItem';
import { useForm } from 'react-hook-form';
import { lastWeek } from '../date/date-utils';
import { HighlightedRadioButton } from '../form/HighlightedRadioButton';
import database from '../firebase-storage/config';
import { SavedExercise } from './types';
import styles from './AddTraining.module.scss';
import { useHistory } from 'react-router';

type Activities = 'run' | 'stretch';

interface FormData {
    type: string;
    feeling?: string;
    distance?: number;
    date: string;
}

const config = {
    activities: [
        {
            name: 'Løp',
            type: 'run' as Activities,
            icon: '🏃‍♂️',
            feelings: {
                default: '😊',
                options: ['😅', '😌', '😊', '😓', '😪', '🤕']
            },
            distance: Array.from(Array(10)).map((_, index) => (index + 5) * 1000)
        },
        {
            name: 'Tøy',
            type: 'strech' as Activities,
            icon: '🧘‍♂️'
        }
    ]
}

const AddActivity = (props: { activity: typeof config.activities[0] }) => {
    const { activity } = props;
    const { register, handleSubmit, reset } = useForm<FormData>();
    const history = useHistory();
    const onSubmit = handleSubmit(datas => {
        const date = new Date(datas.date);
        const toSave: SavedExercise = {
            year: date.getUTCFullYear(),
            month: date.getUTCMonth(),
            day: date.getUTCDay(),
            ...datas
        };

        database.ref(`users/jøran/exercises`).push(toSave)
          .then(() => {
              reset();
              history.push("/show_training");
          })
    });

    const dates = lastWeek();
    return <form onSubmit={onSubmit} className={styles.addTrainingForm}>
        <input type="hidden" name="type" value={activity.type} ref={register}/>

        <fieldset>
            {dates.map((day, index) => {
                const [prettyDate, date] = day;
                return <HighlightedRadioButton displayStyle="styleText" key={'date-input-' + date} name="date" label={prettyDate} value={date} defaultChecked={index === 0} ref={register} />
            })}
        </fieldset>

        {activity.feelings && <fieldset>
            {activity.feelings.options.map(feeling =>
              <HighlightedRadioButton displayStyle="styleEmojiSelector" key={'feeling-input-' + feeling} name="feeling" value={feeling} defaultChecked={feeling === activity.feelings.default} ref={register}/>
            )}
        </fieldset>}

        {activity.distance && <fieldset>
            {activity.distance.map(distance =>
              <HighlightedRadioButton displayStyle="styleText" key={'distance-input-' + distance} name="distanceMeters" label={distance/1000 + 'km'} value={distance.toString()} ref={register}/>
            )}
        </fieldset>}

        <button type="submit">Lagre</button>
    </form>
};


export const AddTraining = () => {
    const [activityType, setActivityType] = useState<typeof config.activities[0]>(config.activities[0]);
    return <>
        <ul className={styles.activities}>
        {
            config.activities.map(activity =>
              <li key={'activity-' + activity.name} className={styles.activity}>
                  <LinkItem emoji={activity.icon} text={activity.name} onClick={() => { setActivityType(activity) }} />
              </li>
            )
        }
        </ul>
        {activityType && <AddActivity activity={activityType} />}
    </>
};
