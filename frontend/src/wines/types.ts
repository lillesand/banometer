export interface NewWine {
  winery: string;
  name: string;
  vintage: string;
  rating: number;
  numberOfBottles: number;
  scanDate: number;
  displayName: string;
  wineName: string;
}

export interface DrunkWine {
  winery: string;
  name: string;
  vintage: string;
  numberOfBottles: number;
  displayName: string;
  wineName: string;
}

export interface ChangedAmount {
  name: string;
  winery: string;
  vintage: string;
  numberOfBottles: number;
  airtableId: string;
  newAmount: number;
  oldAmount: number;
  displayName: string;
  wineName: string;
}

export interface Diff {
  newWines: NewWine[];
  drunkWines: DrunkWine[];
  changedAmount: ChangedAmount[];
  numberOfBottlesNeedSync: number;
}

export interface HighestRated {
  winery: string;
  name: string;
  vintage: string;
  rating: number;
  numberOfBottles: number;
  scanDate: number;
  displayName: string;
  wineName: string;
}

export interface MostCollected {
  winery: string;
  name: string;
  totalAmount: number;
  vintages: string[];
  vintage?: any;
  numberOfBottles: number;
  displayName: string;
  wineName: string;
}

export interface MostRecentlyScanned {
  winery: string;
  name: string;
  vintage: string;
  rating: number;
  numberOfBottles: number;
  scanDate: number;
  displayName: string;
  wineName: string;
}

export interface Stats {
  highestRated: HighestRated[];
  mostCollected: MostCollected[];
  mostRecentlyScanned: MostRecentlyScanned[];
}

export interface WineStatus {
  diff: Diff;
  stats: Stats;
}

export interface WinesResponse {
  now: number[];
  generatedId: string;
  wineStatus: WineStatus;
}
