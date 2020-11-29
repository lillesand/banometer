interface Activity {
  type: string;
  displayName: string;
  verb: string;
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
  distanceMeters?: number;
  durationMinutes?: number;
}
