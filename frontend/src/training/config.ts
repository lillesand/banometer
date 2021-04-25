import { Activity, ActivityType, ExerciseConfig } from './types';

export const activities : { [activityType in ActivityType]: Activity } = {
  run: {
    type: 'run',
    displayName: 'Løping',
    verb: 'løper',
    summary: 'distance',
  },
  bicycle: {
    type: 'bicycle',
    displayName: 'Sykling',
    verb: 'sykler',
    summary: 'distance',
  },
  hike: {
    type: 'hike',
    displayName: 'Gåtur',
    verb: 'rusler',
    summary: 'distance',
  },
  stretch: {
    type: 'stretch',
    displayName: 'Tøying',
    verb: 'tøyer',
    summary: 'count',
  },
  strength: {
    type: 'strength',
    displayName: 'Styrke',
    verb: 'styrker',
    summary: 'count',
  },
  taichi: {
    type: 'taichi',
    displayName: 'Tai Chi',
    verb: 'taichier',
    summary: 'count',
  },
  skiing: {
    type: 'skiing',
    displayName: 'Ski',
    verb: 'går på ski',
    summary: 'distance',
  },
  shoveling: {
    type: 'shoveling',
    displayName: 'Måking',
    verb: 'måker snø',
    summary: 'count',
  },
};



export const people: ExerciseConfig[] = [
  {
    id: 'jøran',
    databaseId: 'jøran',
    activities: [
      {
        type: activities.run,
        icon: '🏃‍',
        feelings: {
          default: '😊',
          options: ['😅', '😌', '😊', '😓', '😪', '🤕']
        },
        distance: Array.from(Array(38)).map((_, index) => (index + 5) * 1000)
      },
      {
        type: activities.bicycle,
        icon: '🚴‍♂️',
        feelings: {
          default: '😊',
          options: ['😁', '😅', '😊', '😓', '😪', '🤕']
        },
        distance: Array.from(Array(70)).map((_, index) => (index + 5) * 1000)
      },
      {
        type: activities.skiing,
        icon: '⛷',
        feelings: {
          default: '😊',
          options: ['😅', '😌', '😊', '😓', '😪', '🤕']
        },
        distance: Array.from(Array(50)).map((_, index) => (index + 5) * 1000)
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
        icon: '🧘',
        durationMinutes: Array.from(Array(42)).map((_, index) => (index + 1) * 10)
      },
      {
        type: activities.skiing,
        icon: '⛷',
        feelings: {
          default: '😊',
          options: ['😅', '😌', '😊', '😓', '😪', '🤕']
        },
        distance: Array.from(Array(30)).map((_, index) => (index + 3) * 1000)
      },
      {
        type: activities.run,
        icon: '🏃',
        feelings: {
          default: '😊',
          options: ['😅', '😌', '😊', '😓', '😪', '🤕']
        },
        distance: Array.from(Array(15)).map((_, index) => (index + 3) * 1000)
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
        distance: Array.from(Array(30)).map((_, index) => (index + 3) * 1000)
      },
      {
        type: activities.shoveling,
        icon: '☃️',
        feelings: {
          default: '',
          options: ['💪', '😊', '😥']
        },
        durationMinutes: Array.from(Array(15)).map((_, index) => (index + 1) * 10)
      }

    ]
  }
]

export const prettyExerciseName = (exerciseType: string) => {
  return Object.values(activities).find(activity => activity.type === exerciseType)?.displayName ?? exerciseType;
};
