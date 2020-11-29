// src/Modules/NumberAI/NumberAINetwork.ts
import { recurrent } from 'brain.js';
import { createLSTMNetwork } from '../../Library/Brain/Brain';
import { NumberAI } from './NumberModel';

let numberAINetwwork: recurrent.LSTM;

export async function createNumbersAINetwork(): Promise<recurrent.LSTM> {
  console.log('Creating timelines network');

  const timelines = await NumberAI.find();

  numberAINetwwork = await createLSTMNetwork(
    'numbersAI',
    timelines.map(({ text: input, output }) => ({
      input,
      output,
    })),
    true,
  );

  return numberAINetwwork;
}

export function testNumberString(inputString: string): string {
  const result = numberAINetwwork.run(inputString);

  return result;
}
