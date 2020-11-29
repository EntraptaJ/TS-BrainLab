// src/Modules/PredictionLab1/PredictionTrainingData.ts
import {} from 'brain.js';
import { Person } from '../Person/Person';
import { Wanted } from './Wanted';

interface IWant {
  /**
   * What do they want
   */
  wanted: Wanted;

  /**
   * What time is it
   */
  time: number;
}

export interface IWantPerson extends IWant {
  /**
   * Who Wants
   */
  wanter: Person;
}

export const trainingData: IWantPerson[] = [];
