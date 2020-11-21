import React from 'react';
import { LinkItem } from '../menu/LinkItem';
import { useParams } from 'react-router';
import { people } from './config';
import { AddActivityForm } from './AddActivityForm';
import styles from './AddTraining.module.scss';

interface OwnParams {
    name: string;
    exercise?: string;
}

export const AddTraining = () => {
    const params = useParams<OwnParams>();
    const config = people.find(person => person.id === params.name);

    if (!config) {
        return <div>Har ikke noe konfigurasjon for {params.name} :(</div>;
    }

    const activity = config.activities.find(exercise => exercise.type.type === params.exercise) ?? config.activities[0];

    return <>
        <ul className={styles.activities}>
        {
            config.activities.map(activity =>
              <li key={'activity-' + activity.type.type} className={styles.activity}>
                  <LinkItem emoji={activity.icon} text={activity.type.displayName} to={`/add_training/${params.name}/${activity.type.type}`} />
              </li>
            )
        }
        </ul>
        <AddActivityForm activity={activity} person={params.name} />
    </>
};
