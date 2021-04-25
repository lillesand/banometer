export type ActivitySummary = 'distance' | 'count';
export type ActivityType = 'run' | 'bicycle' | 'stretch' | 'strength' | 'taichi' | 'hike' | 'skiing' | 'shoveling';

interface Activity {
  type: ActivityType;
  displayName: string;
  verb: string;
  summary: ActivitySummary;
}

interface FeelingConfig {
  default: string;
  options: string[];
}


interface ActivityConfig {
  type: Activity;
  icon: string;
  feelings?: FeelingConfig;
  distance?: number[];
  durationMinutes?: number[];
}

interface ExerciseConfig {
  id: string;
  databaseId: string;
  activities: ActivityConfig[];
}

export interface SavedExercise {
  type: string;
  date: string;
  day: number;
  month: number;
  year: number;
  feeling?: string;
  distanceMeters?: string;
  durationMinutes?: number;
}
