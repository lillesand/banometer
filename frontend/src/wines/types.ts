export interface DrunkWine {
  winery: string;
  name: string;
  vintage: string;
  numberOfBottles: number;
  displayName: string;
  wineName: string;
}

export interface Diff {
  newWines: any[];
  drunkWines: DrunkWine[];
  changedAmount: any[];
  numberOfBottlesNeedSync: number;
}

export interface HighestRated {
  winery: string;
  name: string;
  vintage: string;
  rating: number;
  numberOfBottles: number;
  scanDate: Date;
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
  scanDate: Date;
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
  now: Date;
  generatedId: Date;
  wineStatus: WineStatus;
}


