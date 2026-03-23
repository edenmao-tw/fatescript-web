export type Gender = 'male' | 'female' | 'other';
export type PlanetName = 'sun' | 'moon' | 'mars' | 'mercury' | 'jupiter' | 'venus' | 'saturn' | 'rahu' | 'ketu' | 'ziqi' | 'yuebei';
export type Dignity = 'miao' | 'wang' | 'ping' | 'xian' | 'luo';
export type HouseNumber = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

export interface BirthData {
  name?: string;
  date: string;
  time?: string;
  latitude: number;
  longitude: number;
  timezone: string;
  city: string;
  country: string;
  gender: Gender;
}

export interface PlanetPosition {
  planet: PlanetName;
  longitude: number;
  sign: number;
  signName: string;
  house: HouseNumber;
  dignity: Dignity;
  isLifeStar: boolean;
  retrograde: boolean;
}

export interface House {
  number: HouseNumber;
  cusp: number;
  sign: number;
  signName: string;
  ruler: PlanetName;
  planets: PlanetName[];
}

export interface MajorCycle {
  startAge: number;
  endAge: number;
  startYear: number;
  endYear: number;
  label: string;
}

export interface ChartData {
  birthData: BirthData;
  ascendant: number;
  ascendantSign: number;
  lifeStar: PlanetName;
  bodyStar: PlanetName;
  planets: PlanetPosition[];
  houses: House[];
  majorCycles: MajorCycle[];
  currentCycle: MajorCycle;
  calculatedAt: string;
}

export type ModuleId = '01'|'02'|'03'|'04'|'05'|'06'|'07'|'08'|'09'|'10'|'11'|'12'|'13';
export type ModuleTier = 'free' | 'paid' | 'subscription';

export const MODULE_TIERS: Record<ModuleId, ModuleTier> = {
  '01': 'free', '02': 'free', '03': 'free',
  '04': 'paid', '05': 'paid',
  '06': 'free',
  '07': 'paid', '08': 'paid', '09': 'paid',
  '10': 'free',
  '11': 'subscription', '12': 'subscription', '13': 'subscription',
};

export interface ModuleContent {
  moduleId: ModuleId;
  headline: string;
  body: string;
  timeframe?: string;
  actions?: string[];
  preview?: string;
}
