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
  taichi: {
    type: 'taichi',
    displayName: 'Tai Chi'
  },
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
        icon: '🧘‍♂️'
      }
    ]
  },
  {
    id: 'linda',
    databaseId: 'linda',
    activities: [
      {
        type: activities.taichi,
        icon: '🧘‍♀️'
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
    ]
  }
]
