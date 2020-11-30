// src/Modules/Speakers/SpeakersNetwork.ts
import { recurrent } from 'brain.js';
import { Service, Container } from 'typedi';
import { LSTMNetworkController } from '../../Library/Brain/NetworkController';
import { Speakers } from './Speakers';
import { speakingTrainingData } from './TrainingData';

@Service()
class SpeakersAINetwork {
  public network: recurrent.LSTM;

  public trainingData = speakingTrainingData;

  public constructor(private networkController: LSTMNetworkController) {}

  /**
   * Create and train the speakers neural network
   */
  public async trainNetwork(): Promise<void> {
    this.network = await this.networkController.createNetwork(
      'speakers',
      speakingTrainingData.map(({ input: { speaker, text }, output }) => ({
        input: [speaker, text],
        output,
      })),
    );
  }

  /**
   * Process who is speaking to who
   * @param network Speakers Neural network
   * @param speaker Who is speaking
   * @param text Speaker's text
   */
  public speakingToWho(speaker: Speakers, text: string): string {
    return this.network.run([speaker, text]);
  }
}

export const speakersNetwork = Container.get(SpeakersAINetwork);
