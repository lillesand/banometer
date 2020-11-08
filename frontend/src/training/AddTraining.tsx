import React, { useState } from 'react';
import { LinkItem } from '../menu/LinkItem';
import { useForm } from 'react-hook-form';
import { lastWeek } from '../date/date-utils';
import { HighlightedRadioButton } from '../form/HighlightedRadioButton';
import styles from './AddTraining.module.scss';
import database from '../firebase-storage/config';

type Activities = 'run' | 'stretch';

interface FormData {
    type: string;
    feeling?: string;
    date: string;
    hallo: string;
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
    const { register, handleSubmit, errors } = useForm<FormData>();
    const onSubmit = handleSubmit(datas => {
        database.ref('users/jøran/exercises/' + datas.date).push(datas)
    });

    const dates = lastWeek();
    return <form onSubmit={onSubmit} className={styles.addTrainingForm}>
        <input type="hidden" name="type" value={activity.type} ref={register}/>

        <fieldset>
            {dates.map((day, index) => {
                const [prettyDate, date] = day;
                return <HighlightedRadioButton style="styleText" key={'date-input-' + date} name="date" label={prettyDate} value={date} defaultChecked={index === 0} ref={register} />
            })}
        </fieldset>
        {activity.feelings && <fieldset>
            {activity.feelings.options.map(feeling =>
              <HighlightedRadioButton style="styleEmojiSelector" key={'feeling-input-' + feeling} name="feeling" value={feeling} defaultChecked={feeling === activity.feelings.default} ref={register}/>
            )}
        </fieldset>
        }

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
                  <LinkItem emoji={activity.icon} text={activity.name} onClick={() => { console.log('ok'); setActivityType(activity) }} />
              </li>
            )
        }
        </ul>
        {activityType && <AddActivity activity={activityType} />}


    </>
};
