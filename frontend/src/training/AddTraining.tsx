import React from 'react';
import { LinkItem } from '../menu/LinkItem';
import { useParams } from 'react-router';
import { people } from './config';
import { AddActivityForm } from './AddActivityForm';
import styles from './AddTraining.module.scss';
import { TopBarNavigation } from '../topBarNavigation/TopBarNavigation';

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

        <TopBarNavigation title={{ capitalized: `${params.name}`, rest: "trener" }}>
            {
                config.activities.map(activity =>
                  <LinkItem key={'activity-' + activity.type.type} emoji={activity.icon} text={activity.type.displayName} to={`/add_training/${params.name}/${activity.type.type}`} />
                )
            }
        </TopBarNavigation>
        <AddActivityForm activity={activity} person={params.name} />
    </>
};
