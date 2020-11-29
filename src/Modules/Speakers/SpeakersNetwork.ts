// src/Modules/Speakers/SpeakersNetwork.ts
import { recurrent } from 'brain.js';
import { createLSTMNetwork } from '../../Library/Brain/Brain';
import { Speakers } from './Speakers';
import { speakingTrainingData } from './TrainingData';

export let speakersNetwork: recurrent.LSTM;

/**
 * Create the Speakers Neural network
 */
export async function createSpeakersNetwork(): Promise<recurrent.LSTM> {
  console.log('Creating speakers network');

  speakersNetwork = await createLSTMNetwork(
    'speakers',
    speakingTrainingData.map(({ input: { speaker, text }, output }) => ({
      input: [speaker, text],
      output,
    })),
  );

  return speakersNetwork;
}

/**
 * Process who is speaking to who
 * @param network Speakers Neural network
 * @param speaker Who is speaking
 * @param text Speaker's text
 */
export function speakingToWho(
  network: recurrent.LSTM,
  speaker: Speakers,
  text: string,
): string {
  return network.run([speaker, text]);
}
