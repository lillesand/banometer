import React, { useEffect, useState } from 'react';
import database from '../firebase-storage/config';
import { ExerciseConfig, SavedExercise } from './types';
import { LinkItem } from '../menu/LinkItem';
import { people } from './config';
import { useParams } from 'react-router';
import { ErrorBar } from '../useApi/errorBar/ErrorBar';
import { TrainingWeeks } from './TrainingWeeks';
import { TopBarNavigation } from '../topBarNavigation/TopBarNavigation';

interface ApiResponse {
  data?: {
    result: SavedExercise[];
    config: ExerciseConfig;
  };
  error?: string;
  loading: boolean;
}

interface OwnParams {
  person: string;
}

export const ShowTraining = () => {
  const params = useParams<OwnParams>();

  const [response, setData] = useState<ApiResponse>({ loading: true });

  const fetchExercise = async (config: ExerciseConfig) => {
    const res = await database.ref(`users/${config.databaseId}/exercises`).orderByKey().once('value');
    const data = await res.val() ? Object.values(res.val()) : [];
    setData({
      loading: false,
      data: {
        result: data as SavedExercise[],
        config
      },
    });
  }

  useEffect(() => {
    const config = people.find(person => person.id === params.person);
    if (!config) {
      setData({ loading: false, error: `Har ikke noe konfigurasjon for ${params.person} :(` })
      return;
    }

    fetchExercise(config).catch(error => {
      console.error(error);
      setData({ loading: false, error: error.toString()})
    });
  }, [params.person]);

  if (response.loading) {
    return <div>loading…</div>;
  }

  if (response.error) {
    return <div>
      <ErrorBar>Ugh, noe feilet: {response.error}</ErrorBar>
    </div>
  }

  const trainingData = response.data?.result!!;
  const config = response.data?.config!!;

  return <>
    <TopBarNavigation title={{capitalized: `${params.person}s`, rest: "treningslogg"}}>
      <LinkItem to={`/add_training/${config.id}`} emoji="➕" text="Ny" />
    </TopBarNavigation>
    <div>
      { trainingData.length === 0 && <div>Ikke noe treningsdata registrert. På tide å komme seg ut!</div> }
      { trainingData.length > 0 && <TrainingWeeks trainingData={trainingData} /> }
    </div>
  </>;
};
