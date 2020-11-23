import { ExerciseConfig } from './types';

export const activities = {
  run: {
    type: 'run',
    displayName: 'Løping'
  },
  stretch: {
    type: 'stretch',
    displayName: 'Tøying'
  },
  strength: {
    type: 'strength',
    displayName: 'Styrke'
  },
  taichi: {
    type: 'taichi',
    displayName: 'Tai Chi'
  },
  hike: {
    type: 'hike',
    displayName: 'Gåtur'
  }
};


export const people: ExerciseConfig[] = [
  {
    id: 'jøran',
    databaseId: 'jøran',
    activities: [
      {
        type: activities.run,
        icon: '🏃‍♂️',
        feelings: {
          default: '😊',
          options: ['😅', '😌', '😊', '😓', '😪', '🤕']
        },
        distance: Array.from(Array(10)).map((_, index) => (index + 5) * 1000)
      },
      {
        type: activities.stretch,
        icon: '🧘‍'
      },
      {
        type: activities.strength,
        icon: '🏋️‍',
        feelings: {
          default: '😐',
          options: ['💪😅', '😐', '😓', '🤬']
        },
      },
      {
        type: activities.hike,
        icon: '🏔',
        distance: Array.from(Array(10)).map((_, index) => (index + 5) * 1000)
      },
    ]
  },
  {
    id: 'linda',
    databaseId: 'linda',
    activities: [
      {
        type: activities.taichi,
        icon: '🧘‍♀️',
        durationMinutes: Array.from(Array(8)).map((_, index) => (index + 1) * 10)
      },
      {
        type: activities.run,
        icon: '🏃‍♀️',
        feelings: {
          default: '😊',
          options: ['😅', '😌', '😊', '😓', '😪', '🤕']
        },
        distance: Array.from(Array(8)).map((_, index) => (index + 3) * 1000)
      },
      {
        type: activities.hike,
        icon: '🏔',
        distance: Array.from(Array(10)).map((_, index) => (index + 3) * 1000)
      },
    ]
  }
]

export const prettyExerciseName = (exerciseType: string) => {
  return Object.values(activities).find(activity => activity.type === exerciseType)?.displayName ?? exerciseType;
};
